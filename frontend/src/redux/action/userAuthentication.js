export const userEmailAuthentication = e => {
  return {
    type: "SET_USER_EMAIL",
    setEmail: e
  };
};

export const loginAuthentication = e => {
  return {
    type: "CHECK_LOGGEDIN",
    checkLogin: e
  };
};
