function authenticate() {
  const token = localStorage.getItem("accessToken") || null;
  if (token) return true;
  else return false;
}
export default authenticate;
