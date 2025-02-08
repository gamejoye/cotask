type Options = {
  keyGenerator?: (...args: any[]) => string;
  expirationTime?: number;
};

export function memoized<T extends (...args: any[]) => any>(
  fn: T,
  options: Options = {}
): (...args: Parameters<T>) => ReturnType<T> {
  const { keyGenerator, expirationTime } = options;
  const cache = new Map<string, { value: ReturnType<T>; expirationTime: number }>();
  return function (...args: Parameters<T>): ReturnType<T> {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      const { value, expirationTime: cacheExpirationTime } = cache.get(key)!;
      if (expirationTime && cacheExpirationTime + expirationTime > Date.now()) {
        return value;
      }
    }
    const result = fn(...args);
    cache.set(key, { value: result, expirationTime: Date.now() + (expirationTime ?? 0) });
    return result;
  };
}
