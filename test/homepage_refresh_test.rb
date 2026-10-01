# frozen_string_literal: true

require "fileutils"
require "minitest/autorun"
require "nokogiri"
require "open3"
require "uri"

class HomepageRefreshTest < Minitest::Test
  ROOT = File.expand_path("..", __dir__)
  DESTINATION = File.join(ROOT, "tmp/homepage-refresh-test-site")

  def setup
    unless self.class.instance_variable_defined?(:@built)
      FileUtils.rm_rf(DESTINATION)
      stdout, stderr, status = Open3.capture3(
        "bundle", "exec", "jekyll", "build", "--destination", DESTINATION, chdir: ROOT
      )
      raise "Jekyll build failed:\n#{stdout}\n#{stderr}" unless status.success?
      self.class.instance_variable_set(:@built, true)
    end
    @home = Nokogiri::HTML(File.read(File.join(DESTINATION, "index.html")))
  end

  def test_deadlines_remain_readable_without_javascript
    html = File.read(File.join(DESTINATION, "academic-deadlines/index.html"))
    assert_includes html, "<noscript>"
    assert_includes html, "Live countdowns and filters require JavaScript"
    assert_match(/academic-deadlines__counter[^}]+display:\s*none/m, html)
  end

  def test_internal_navigation_and_asset_urls_resolve
    missing = []
    Dir.glob(File.join(DESTINATION, "**/*.html")).each do |file|
      doc = Nokogiri::HTML(File.read(file))
      doc.css("a[href], link[href], img[src], script[src]").each do |element|
        url = element["href"] || element["src"]
        uri = URI.parse(url.strip)
        next unless [nil, "http", "https"].include?(uri.scheme)
        next if uri.host && uri.host != "yuxuandexter.github.io"
        next if uri.path.to_s.empty?
        relative = URI::DEFAULT_PARSER.unescape(uri.path)
        target = if relative.start_with?("/")
                   File.join(DESTINATION, relative)
                 else
                   File.expand_path(relative, File.dirname(file))
                 end
        candidates = [target, File.join(target, "index.html"), "#{target}.html"]
        missing << url unless candidates.any? { |path| File.file?(path) }
      end
    end
    assert_empty missing.uniq, "All public pages must link to real local files/routes"
  end

  def test_public_output_excludes_templates_and_preserves_real_routes
    sitemap = File.read(File.join(DESTINATION, "sitemap.xml"))
    ["deprecated/", "CLAUDE", "design_ideas", "CONTRIBUTING", "markdown_generator/", "talkmap/", "tasks/", "test/", "talks/", "teaching/"].each do |path|
      refute Dir.glob(File.join(DESTINATION, "#{path}*")).any?, "Unexpected published artifact: #{path}"
      refute_includes sitemap, path
    end
    ["archive-layout-with-content", "markdown", "non-menu-page", "collection-archive", "talkmap"].each do |path|
      refute_includes sitemap, "/#{path}"
    end
    assert File.file?(File.join(DESTINATION, "files/Yuxuan_Resume.pdf"))
    assert File.file?(File.join(DESTINATION, "cv/index.html"))
    assert File.file?(File.join(DESTINATION, "publication/2025-05-21-lmgame-bench-neurips-main-track.html"))
    (1..4).each do |n|
      redirect = File.read(File.join(DESTINATION, "portfolio/portfolio-#{n}/index.html"))
      assert_includes redirect, "/#gamingagent-grl"
      assert_includes redirect, 'http-equiv="refresh"'
    end
    description = @home.at_css('meta[name="description"]')
    refute_nil description, "Homepage must render the current site description"
    refute_includes description["content"], "Incoming"
    sidebar = File.read(File.join(DESTINATION, "publications/index.html"))
    refute_includes sidebar, "Incoming Ph.D."
  end

  def test_publications_show_authors_and_a_single_venue_year
    items = @home.css(".publication-item")
    assert_equal 2, items.size
    assert_equal "https://arxiv.org/abs/2505.15146", items.first.at_css(".publication-item__title a")["href"]
    assert_equal 2, @home.css(".publication-item__authors strong").count { |n| n.text == "Yuxuan Zhang" }
    assert_includes items.first.text, "Lanxiang Hu"
    refute_includes items.first.text, "**LMGame-Bench**"
    pages = [
      ["publication/2025-05-21-lmgame-bench-neurips-main-track.html", "ICLR 2026", "https://arxiv.org/abs/2505.15146"],
      ["publication/2025-07-15-llm-agents-icml-workshop.html", "ICML MAS Workshop 2025", "https://arxiv.org/abs/2507.11633"]
    ]
    pages.each do |path, venue, paper|
      page = Nokogiri::HTML(File.read(File.join(DESTINATION, path)))
      assert_includes page.at_css(".page__inner-wrap header").text, venue
      refute_match(/#{Regexp.escape(venue)},\s*20\d\d/, page.text)
      assert_includes page.at_css(".page__content").text, "Yuxuan Zhang"
      assert page.css(".page__content a").any? { |a| a["href"] == paper }
    end
    archive = Nokogiri::HTML(File.read(File.join(DESTINATION, "publications/index.html")))
    assert_includes archive.text, "Lanxiang Hu"
    refute_match(/ICLR 2026,\s*2026/, archive.text)
  end

  def test_homepage_matches_approved_identity_order_and_contributions
    titles = @home.css(".work-item__title").map { |n| n.text.strip }
    assert_equal [
      "FastAFD — Attention–FFN Disaggregation for MoE Inference",
      "GamingAgent & GRL — Game-Based Evaluation and Multi-Turn RL",
      "NanoRollout — Scaling Digital Agent RL and Distillation",
      "Tunix — LLM Post-Training on TPUs"
    ], titles
    intro = @home.at_css(".home-intro").text
    assert_includes intro, "Ph.D. student in Data Science"
    assert_includes intro, "systems for LLM inference and reinforcement learning"
    assert_includes intro, "Previously, I interned at Google"
    refute_includes intro, "incoming"
    refute @home.css(".home-links a").any? { |a| a.text.strip == "CV" }
    assert_equal ["Recent News", "Selected Work", "Publications"], @home.css(".page__content h2").map { |n| n.text.strip }
    nano = @home.at_css("#nanorollout")
    refute_nil nano
    assert_includes nano.text, "Equal contribution"
    assert_includes nano.text, "single-harness training can perform worse than the base model"
    assert_equal "Blog", nano.at_css(".item-links a").text
    tunix = @home.at_css("#tunix")
    refute_nil tunix
    assert_includes tunix.text, "sequence packing"
    refute_match(/zero.?TIM|numerical alignment/i, tunix.text)
    refute_match(/\d+ commits|top contributor|300K\+ trajectories/, @home.css(".work-list").text)
  end
end
