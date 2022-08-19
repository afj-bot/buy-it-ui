const { REACT_APP_ENV } = process.env;
const { REACT_APP_API_URL } = process.env;
export * from "./routes";

/**
 *
 * Gateway url for API, Websocket for stream and chat
 *
 */
export const API_BASE_URL =
    REACT_APP_ENV === "TEST"
      ? `http://${REACT_APP_API_URL}/api/v1`
      : `https://${REACT_APP_API_URL}/api/v1`;

export const AUTH_TOKEN_ATTRIBUTE = "token";
export const ANONYMOUS_ATTRIBUTE = "anonymous";
export const LANGUAGE_ATTRIBUTE = "language";

export const OK = 200;
export const SERVER_ERROR = 504;
