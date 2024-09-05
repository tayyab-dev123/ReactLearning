const customerInitialState = {
  fullName: "",
  NationalID: "",
};

export default function customerReducer(state = customerInitialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        NationalID: action.payload.NationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, NationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, NationalID, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
