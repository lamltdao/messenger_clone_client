const PROD_BASE_URL = "https://messenger-clone-321009.et.r.appspot.com";
export const AUTH_BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001"
    : PROD_BASE_URL;
export const CONVERSATION_BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : PROD_BASE_URL;
export const CLIENT_BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : PROD_BASE_URL;
