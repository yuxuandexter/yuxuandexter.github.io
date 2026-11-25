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

  def test_show_past_control_has_quiet_inline_styling
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"
    css = File.read(File.join(DESTINATION, "assets/css/main.css"))
    control = css[/\.academic-deadlines__show-past\{([^}]+)\}/, 1]
    refute_nil control, "Show-past checkbox needs scoped styling rather than full-size form defaults"
    assert_includes control, "display:inline-flex"
    assert_includes control, "align-items:center"
    assert_includes control, "font-size:"
    assert_includes control, "color:"
  end

  def test_filtering_can_hide_nonmatching_entries
    styles = File.read("_sass/_academic-deadlines.scss")

    assert_includes styles, ".academic-deadlines__row[hidden]"
  end

  def test_deadline_rail_interleaves_confirmed_and_past_cycle_planning_rows
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"

    html = File.read(@page)
    assert_includes html, "Past-cycle basis"
    assert_includes html, "ICML ’27"
    assert_includes html, "Jan 14, 2027 · AoE"
    assert_includes html, "Jan 22, 2027 · AoE"
    assert_includes html, "CAV ’27"
    assert_includes html, "OOPSLA ’27"
    assert_includes html, "Verification / PL"
    rows = html.scan(/<article class="academic-deadlines__row.*?<\/article>/m)
    icml_rows = rows.select { |row| row.include?("ICML ’27") }
    assert_equal 2, icml_rows.length
    icml_rows.each do |row|
      assert_includes row, "https://icml.cc/Conferences/2027/CallForPapers"
      assert_includes row, "Official CFP"
      refute_includes row, "Past-cycle basis"
    end
    assert_includes icml_rows[0], "Abstract submission"
    assert_includes icml_rows[0], 'data-deadline="2027-01-15T11:59:00Z"'
    assert_includes icml_rows[1], 'data-deadline="2027-01-23T11:59:00Z"'
    assert_includes html, "end-of-day AoE convention"
    deadlines = rows.map { |row| row[/data-deadline="([^"]+)"/, 1] }
    assert_equal deadlines.sort, deadlines
    assert_equal 14, rows.length
    assert_operator html.index("OSDI ’27"), :<, html.index("ICML ’27")
    refute_includes html, "Awaiting official CFP"
    refute_includes html, ">TBD<"
  end

  def test_past_cycle_rows_keep_their_historical_source_without_tbd_copy
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"

    html = File.read(@page)
    assert_includes html, "SOSP ’27"
    assert_includes html, "ASPLOS ’28"
    assert_includes html, "April cycle"
    assert_includes html, "Apr 15, 2027 · 11:59 pm AoE"
    assert_includes html, "Past CFP"
    refute_includes html, "Last official cycle"
  end

  def test_builds_a_public_countdown_page_from_official_sources
    assert @status.success?, "Jekyll build failed:\n#{@stdout}\n#{@stderr}"
    assert File.exist?(@page), "Academic Deadlines page was not built"

    html = File.read(@page)
    assert_includes html, "Academic Deadlines"
    assert_includes html, "OSDI ’27"
    assert_includes html, "NSDI ’28"
    assert_includes html, "https://www.usenix.org/conference/osdi27/call-for-papers"
    assert_includes html, "prior official cycle as a planning reference"
    assert_includes html, "No deadlines or CFP references are available for this filter."
  end
end
