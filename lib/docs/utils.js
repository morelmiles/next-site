export function getSlug({ slug }) {
  if (slug[0].toLowerCase() === 'tag') {
    return {
      tag: slug[1].toLowerCase(),
      slug: `/docs/${slug
        .slice(2)
        .join('/')
        .toLowerCase()}`
    };
  }
  return { slug: `/docs/${slug.join('/').toLowerCase()}` };
}

export function removeFromLast(path, key) {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}
