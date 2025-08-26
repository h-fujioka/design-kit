// アプリケーションルート
export const APP_ROUTES = {
  HOME: '/',
  STYLEGUIDE: '/styleguide',
  PROTOTYPES: {
    HOME: '/prototypes',
    VC_COMPASS: '/prototypes/vc-compass',
  },
} as const;

// API ルート
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
    SETTINGS: '/api/users/settings',
  },
  PRODUCTS: {
    BASE: '/api/products',
    CATEGORIES: '/api/products/categories',
    SEARCH: '/api/products/search',
  },
  ORDERS: {
    BASE: '/api/orders',
    CART: '/api/orders/cart',
    CHECKOUT: '/api/orders/checkout',
  },
  POSTS: {
    BASE: '/api/posts',
    COMMENTS: '/api/posts/comments',
    CATEGORIES: '/api/posts/categories',
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    CHARTS: '/api/dashboard/charts',
    ANALYTICS: '/api/dashboard/analytics',
  },
  UPLOAD: {
    IMAGE: '/api/upload/image',
    FILE: '/api/upload/file',
  },
} as const;

// 外部リンク
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com',
  DOCUMENTATION: '/docs',
  SUPPORT: '/support',
} as const;

// ナビゲーション構造
export const NAVIGATION = {
  MAIN: [
    { label: 'Home', href: APP_ROUTES.HOME },
    { label: 'Styleguide', href: APP_ROUTES.STYLEGUIDE },
    { label: 'Prototypes', href: APP_ROUTES.PROTOTYPES.HOME },
  ],
  PROTOTYPES: [
    { label: 'VC Compass', href: APP_ROUTES.PROTOTYPES.VC_COMPASS },
  ],
} as const;
