export const isLocalhostEnv = typeof window !== 'undefined' && window.location.hostname === 'localhost';
export const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
export const mapLegendStorageKey = 'map-legend';
