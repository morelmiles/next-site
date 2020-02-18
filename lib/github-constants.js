import path from 'path';

export const USE_CACHE = process.env.USE_CACHE === 'true';

export const TAG_CACHE_PATH = path.resolve('.github-latest-tag');

export const GITHUB_URL = 'https://github.com';

export const GITHUB_API_URL = 'https://api.github.com';

export const RAW_GITHUB_URL = 'https://raw.githubusercontent.com';

export const REPO_NAME = 'zeit/next.js';

export const REPO_BRANCH = 'canary';
