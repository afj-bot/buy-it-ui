/**
 * Public routes that should has access withoud token
 */
export const PUBLIC_ROUTES = {
  LOGIN: "/login",
  NOT_FOUND: "/404",
  DASHBOARD: "/",
  PRODUCTS: "/products",
  DELIVERY: "/delivery",
  CONTACT_US: "/contact-us",
  FORGOT_PASSWORD: "/forgot-password",
  REGISTRATION: "/registration",
  MY_CART: "/my/cart",
  SEARCH: "/search",
  PRODUCT: "/product",
  PRODUCT_ID: "product/:id"
};

/**
* Routes that need to have token in the localstorage
*/
export const AUTH_ROUTES = {
  LOGOUT: "/logout",
  MY_PROFILE: "/profile",
};

/**
* Admin routes that need to have admin permission to access
*/
export const ADMIN_ROUTES = {
  ADMIN: "/admin",
};
