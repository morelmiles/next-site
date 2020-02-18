import fetch from './fetch';
import {
  GITHUB_API_URL,
  RAW_GITHUB_URL,
  REPO_NAME,
  REPO_BRANCH,
  USE_CACHE,
  TAG_CACHE_PATH
} from './github-constants';
import { readFile, writeFile } from './fs-utils';

function getErrorText(res) {
  try {
    return res.text();
  } catch (err) {
    return res.statusText;
  }
}

async function getError(res) {
  const errorText = await getErrorText(res);
  const error = new Error(`GitHub raw download error (${res.status}): ${errorText}`);

  error.headers = res.headers.raw();

  return error;
}

export async function getRawFileFromGitHub(path) {
  const res = await fetch(RAW_GITHUB_URL + path);

  if (res.ok) return res.text();
  throw await getError(res);
}

export function getRawFileFromRepo(path, tag = REPO_BRANCH) {
  return getRawFileFromGitHub(`/${REPO_NAME}/${tag}${path}`);
}

export async function getLatestTag() {
  let cachedTag;

  if (USE_CACHE) {
    try {
      cachedTag = await readFile(TAG_CACHE_PATH, 'utf8');
    } catch (error) {
      // A cached file is not required
    }
  }

  if (!cachedTag) {
    const res = await fetch(`${GITHUB_API_URL}/repos/${REPO_NAME}/releases/latest`);

    if (res.ok) {
      const data = await res.json();
      const tag = data.tag_name;

      if (USE_CACHE) {
        try {
          await writeFile(TAG_CACHE_PATH, tag, 'utf8');
        } catch (error) {
          // A cached file is not required
        }
      }

      cachedTag = tag;
    }
  }

  return cachedTag;
}
