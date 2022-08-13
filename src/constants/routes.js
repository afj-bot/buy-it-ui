/**
 * Public routes that should has access withoud token
 */
export const PUBLIC_ROUTES = {
  LOGIN: "/login",
  NOT_FOUND: "/404",
  DASHBOARD: "/",
  FORGOT_PASSWORD: "/forgot-password",
};

/**
* Routes that need to have token in the localstorage
*/
export const AUTH_ROUTES = {
  LOGOUT: "/logout",
  MY_PROFILE: "/profile/me",
};

/**
* Admin routes that need to have admin permission to access
*/
export const ADMIN_ROUTES = {
  ADMIN: "/admin",
};