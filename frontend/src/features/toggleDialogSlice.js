import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { open: false, caller: "", _id: "" },
};

export const toggleDialogSlice = createSlice({
  name: "toggleDialog",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value.open = !state.value.open;
    },
    setCaller: (state, action) => {
      state.value.caller = action.payload;
    },
    setId: (state, action) => {
      state.value._id = action.payload;
    },
    resetState: (state) => {
      state.value = initialState.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle, setCaller, setId, resetState } =
  toggleDialogSlice.actions;
export default toggleDialogSlice.reducer;

export const selectOpen = (state) => state.toggleDialog.value.open;
export const selectId = (state) => state.toggleDialog.value._id;
export const selectCaller = (state) => state.toggleDialog.value.caller;
