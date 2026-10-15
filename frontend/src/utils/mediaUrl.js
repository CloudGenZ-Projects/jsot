export const getBackendUrl = () => {
  const envBackend = import.meta.env.VITE_API_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;
  if (envBackend) return envBackend.replace(/\/+$/, '');
  return '';  // Same origin - no prefix needed
};

export const getImageUrl = (path, fallback = '') => {
  if (!path) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalizedPath = path.replace(/\\/g, '/');
  const safePath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  return safePath;
};
