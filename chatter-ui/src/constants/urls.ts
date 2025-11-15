const API_URL = process.env.REACT_APP_API_URL;

const SIGNUP_URL = `${API_URL}/api/v1/auth/signup`;
const LOGIN_URL = `${API_URL}/api/v1/auth/login`;

export { SIGNUP_URL, LOGIN_URL, API_URL };