// we are defining the reducer function here, which will tell us how to perform the action and what has to be done

// defining the initial state of user reducer as an object with a "user" property which is intialized to an empty object
const initialState = {
  user: {},
};

// the reducer function takes in two parameters state and action, state is representing the current state  of the application and action represents the action being dispatched
const userReducer = (state = initialState, action) => {
  /*if the action type is  "login success returning a new state object having the current state(which is kept unchanged)"
  and updating the user property with the value from the action.payload */
  if (action.type === "LOGIN_SUCCESS") {
    return {
      ...state,
      user: action.payload, // here i am updating the user state with the state being passed in the "payload"
    };
  }
  // in this case, simply returing the new state by spreading the properties of initial state(basically resetting the  user property to an empty object)
  if (action.type === "LOGIN_FAILURE") {
    return {
      ...initialState, // in case of unsuccesful login simply we are returning the initial state
    };
  }
  return state; // simply returning the unchanged current state
};

export default userReducer;
