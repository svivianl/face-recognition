export const saveAuthToken = (token: string) => {
  window.sessionStorage.setItem("token", token);
};
