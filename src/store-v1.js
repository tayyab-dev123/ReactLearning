import { combineReducers, createStore } from "redux";
const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const customerInitialState = {
  fullName: "",
  NationalID: "",
};
function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = customerInitialState, action) {
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

const rootReducer = combineReducers({
  accountReducer: accountReducer,
  customerReducer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 100 });
// store.dispatch({ type: "account/withdraw", payload: 50 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "To buy a car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
  store.dispatch({ type: "account/deposit", payload: amount });
}

function withdraw(amount) {
  store.dispatch({ type: "account/withdraw", payload: amount });
}

function requestLoan(amount, purpose) {
  store.dispatch({
    type: "account/requestLoan",
    payload: { amount, purpose },
  });
}

function payLoan() {
  store.dispatch({ type: "account/payLoan" });
}

deposit(100);

withdraw(50);

console.log(store.getState());

requestLoan(1000, "To buy a car");

console.log(store.getState());

payLoan();

console.log(store.getState());

function createCustomer(fullName, NationalID) {
  store.dispatch({
    type: "customer/createCustomer",
    payload: { fullName, NationalID, createdAt: new Date().toISOString() },
  });
}
function updateName(fullName) {
  store.dispatch({
    type: "customer/updateName",
    payload: fullName,
  });
}

createCustomer("John Doe", "1234567890");

console.log(store.getState());

updateName("Tayyab");

console.log(store.getState());
