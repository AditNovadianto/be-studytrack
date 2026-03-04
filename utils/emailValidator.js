export const isValidBakrieEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@student\.bakrie\.ac\.id$/;
  return regex.test(email);
};
