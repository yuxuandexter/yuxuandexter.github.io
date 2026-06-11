#!/usr/bin/env node

const fs = require("fs");
const https = require("https");

const OUTPUT_PATH = "_data/github_metrics.yml";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const GITHUB_USER = "yuxuandexter";

const projects = [
  {
    key: "gamingagent",
    repo: "lmgame-org/GamingAgent",
    metricOrder: ["top contributor", "user_commits", "stars", "ICLR 2026"],
  },
  {
    key: "nanorollout",
    repo: "cocoa-org/NanoRollout",
    metricOrder: ["stars", "500-worker SWE-Bench eval", "300K+ trajectories"],
  },
  {
    key: "grl",
    repo: "lmgame-org/GRL",
    metricOrder: ["user_commits", "stars", "multi-turn RL"],
  },
  {
    key: "tunix",
    repo: "google/tunix",
    metricOrder: ["user_commits", "stars", "Google open source", "LLM post-training"],
  },
];

function requestJson(path) {
  const options = {
    hostname: "api.github.com",
    path,
    method: "GET",
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": "yuxuandexter-github-metrics-updater",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  if (GITHUB_TOKEN) {
    options.headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`GitHub API ${res.statusCode} for ${path}: ${body}`));
          return;
        }

        try {
          resolve({
            data: body ? JSON.parse(body) : null,
            headers: res.headers,
          });
        } catch (error) {
          reject(new Error(`Invalid JSON for ${path}: ${error.message}`));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

async function fetchRepo(repo) {
  const result = await requestJson(`/repos/${repo}`);
  return result.data;
}

async function fetchContributorCommits(repo, login) {
  const result = await requestJson(`/repos/${repo}/contributors?per_page=100`);
  const contributors = Array.isArray(result.data) ? result.data : [];
  const contributor = contributors.find((item) => item.login === login);
  return contributor ? contributor.contributions : null;
}

async function fetchTotalCommits(repo) {
  const result = await requestJson(`/repos/${repo}/commits?per_page=1`);
  const link = result.headers.link || "";
  const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
  if (match) {
    return Number.parseInt(match[1], 10);
  }
  return Array.isArray(result.data) ? result.data.length : null;
}

function formatStars(stars) {
  if (typeof stars !== "number") {
    return null;
  }
  if (stars >= 1000) {
    const value = stars / 1000;
    const rounded = value >= 10 ? Math.round(value).toString() : value.toFixed(1);
    return `${rounded.replace(/\.0$/, "")}k stars`;
  }
  return `${stars} stars`;
}

function formatCommits(commits) {
  if (typeof commits !== "number") {
    return null;
  }
  return `${commits} commits`;
}

function metricLabel(metric, values) {
  if (metric === "stars") {
    return formatStars(values.stars);
  }
  if (metric === "user_commits") {
    return formatCommits(values.userCommits);
  }
  if (metric === "total_commits") {
    return formatCommits(values.totalCommits);
  }
  return metric;
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function yamlScalar(value) {
  if (value === null || value === undefined) {
    return "null";
  }
  if (typeof value === "number") {
    return String(value);
  }
  return yamlString(value);
}

function renderYaml(metrics) {
  const lines = [
    "# Auto-updated by scripts/update_github_metrics.js.",
    "# Values are generated at build time and used as homepage metadata.",
    `updated_at: ${yamlString(new Date().toISOString())}`,
    "",
  ];

  for (const item of metrics) {
    lines.push(`${item.key}:`);
    lines.push(`  repo: ${yamlString(item.repo)}`);
    lines.push(`  stars: ${yamlScalar(item.stars)}`);
    lines.push(`  forks: ${yamlScalar(item.forks)}`);
    lines.push(`  total_commits: ${yamlScalar(item.totalCommits)}`);
    lines.push(`  user_commits: ${yamlScalar(item.userCommits)}`);
    lines.push("  metrics:");
    for (const metric of item.metrics) {
      lines.push(`    - ${yamlString(metric)}`);
    }
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

async function main() {
  const metrics = [];

  for (const project of projects) {
    const repo = await fetchRepo(project.repo);
    const [userCommits, totalCommits] = await Promise.all([
      fetchContributorCommits(project.repo, GITHUB_USER),
      fetchTotalCommits(project.repo),
    ]);

    const values = {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      totalCommits,
      userCommits,
    };

    const renderedMetrics = project.metricOrder
      .map((metric) => metricLabel(metric, values))
      .filter(Boolean);

    metrics.push({
      key: project.key,
      repo: project.repo,
      stars: values.stars,
      forks: values.forks,
      totalCommits: values.totalCommits,
      userCommits: values.userCommits,
      metrics: renderedMetrics,
    });
  }

  fs.writeFileSync(OUTPUT_PATH, renderYaml(metrics));
  console.log(`Updated ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
