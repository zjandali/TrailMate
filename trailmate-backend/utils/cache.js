// utils/cache.js

const cache = {};
const DEFAULT_TTL = 3600 * 1000; // 1 hour in milliseconds

function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;
  const now = Date.now();
  if (now > entry.expiry) {
    // Entry expired
    delete cache[key];
    return null;
  }
  return entry.value;
}

function setCache(key, value, ttl = DEFAULT_TTL) {
  const now = Date.now();
  cache[key] = {
    value,
    expiry: now + ttl,
  };
}

module.exports = { getCache, setCache };
