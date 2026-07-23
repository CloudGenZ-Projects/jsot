export const getBackendUrl = () => {
  const envBackend = import.meta.env.VITE_API_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;
  if (envBackend) {
    return envBackend.replace(/\/+$/, '');
  }
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase) {
    return envBase.replace(/\/api\/?$/, '').replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && (window.location.hostname.includes('cloudgenz.com') || window.location.hostname.includes('jsotcanada.org'))) {
    return 'https://jsot-api.cloudgenz.com';
  }
  return 'http://localhost:5000';
};

export const getImageUrl = (path, fallback = "") => {
  if (!path) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const cleanBaseUrl = getBackendUrl();
  const normalizedPath = path.replace(/\\/g, '/');
  const safePath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  return `${cleanBaseUrl}${safePath}`;
};
