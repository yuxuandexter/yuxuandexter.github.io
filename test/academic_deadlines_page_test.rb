# frozen_string_literal: true

require "fileutils"
require "minitest/autorun"
require "open3"

class AcademicDeadlinesPageTest < Minitest::Test
  DESTINATION = "tmp/academic-deadlines-test-site"

  def setup
    FileUtils.rm_rf(DESTINATION)
    @stdout, @stderr, @status = Open3.capture3(
      "bundle", "exec", "jekyll", "build", "--destination", DESTINATION
    )
    @page = File.join(DESTINATION, "academic-deadlines", "index.html")
  end

  def test_filtering_can_hide_nonmatching_entries
    styles = File.read("_sass/_academic-deadlines.scss")

    assert_includes styles, ".academic-deadlines__row[hidden]"
  end

  def test_deadline_rail_interleaves_confirmed_and_past_cycle_planning_rows
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"

    html = File.read(@page)
    assert_includes html, "Past-cycle basis"
    assert_includes html, "ICLR ’27"
    assert_includes html, "Sep 24, 2026 · 11:59 pm AoE"
    assert_operator html.index("NSDI ’27"), :<, html.index("ICLR ’27")
    refute_includes html, "Awaiting official CFP"
    refute_includes html, ">TBD<"
  end

  def test_past_cycle_rows_keep_their_historical_source_without_tbd_copy
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"

    html = File.read(@page)
    assert_includes html, "ASPLOS ’27"
    assert_includes html, "September cycle"
    assert_includes html, "Sep 9, 2026 · 11:59 pm AoE"
    assert_includes html, "Past CFP"
    refute_includes html, "Last official cycle"
  end

  def test_builds_a_public_countdown_page_from_official_sources
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"
    assert File.exist?(@page), "Academic Deadlines page was not built"

    html = File.read(@page)
    assert_includes html, "Academic Deadlines"
    assert_includes html, "NSDI ’27"
    assert_includes html, "OSDI ’27"
    assert_includes html, "https://www.usenix.org/conference/nsdi27/call-for-papers"
    assert_includes html, "prior official cycle as a planning reference"
    assert_includes html, "No deadlines or CFP references are available for this filter."
  end
end
