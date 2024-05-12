//  we are defining the action which we want to carry out which is two here - succesful login and login failure

const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user, // passing user in the payload which will come form dispatch fuction to update the user state accordingly
  };
};

const loginFailure = () => {
  return {
    type: "LOGIN_FAILURE",
  };
};

export { loginSuccess, loginFailure }; // exporting the function
