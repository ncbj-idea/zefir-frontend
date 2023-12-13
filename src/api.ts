import { apiUrl } from '@/config';
import { Http } from '@/types';

const http = new Http({
  BASE: apiUrl,
  WITH_CREDENTIALS: true,
});

const httpLocal = new Http({
  BASE: typeof window !== 'undefined' ? window.location.origin : '/',
  WITH_CREDENTIALS: false,
});

const httpExternal = new Http();

export { http, httpExternal, httpLocal };
