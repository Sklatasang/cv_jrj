const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "cv_jrj";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? `/${repositoryName}` : ""
};

export default nextConfig;
