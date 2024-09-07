import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  NationalID: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, NationalID) {
        return {
          payload: { fullName, NationalID },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.NationalID = action.payload.NationalID;
        state.createdAt = new Date().toISOString();
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = customerInitialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         NationalID: action.payload.NationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, NationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, NationalID, createdAt: new Date().toISOString() },
//   };
// }
// export function updateName(fullName) {
//   return {
//     type: "customer/updateName",
//     payload: fullName,
//   };
// }
