export const isLoggedIn = () => {
  const token = localStorage.getItem("BrandName_auth_token");
  return token ? true : false;
};
