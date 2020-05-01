export const saveAuthToken = (token: string) => {
  window.sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return window.sessionStorage.getItem("token");
};

export const clearToken = () => {
  window.sessionStorage.removeItem("token");
};
