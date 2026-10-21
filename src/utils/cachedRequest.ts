const TTL = 1000 * 60 * 10; // 10 min

const cache = new Map<string, { promise: Promise<unknown>; expires: number }>();

// Shares one in-flight/recent request between every section that needs the
// same data (events, sponsors, ...), so the home page doesn't hit the API
// once per section.
export function cachedRequest<T>(key: string, fetcher: () => Promise<T>) {
  const hit = cache.get(key);

  if (hit && hit.expires > Date.now()) {
    return hit.promise as Promise<T>;
  }

  const promise = fetcher().catch((error) => {
    cache.delete(key);
    throw error;
  });

  cache.set(key, { promise, expires: Date.now() + TTL });

  return promise;
}
