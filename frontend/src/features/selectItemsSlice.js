import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: [],
};

export const selectItemSlice = createSlice({
  name: "selectItem",
  initialState,
  reducers: {
    handleSelected: (state, action) => {
      const currentIndex = state.selected.indexOf(action.payload);
      const newSelected = [...state.selected];

      if (currentIndex === -1) {
        newSelected.push(action.payload);
      } else {
        newSelected.splice(currentIndex, 1);
      }

      return { ...state, selected: newSelected };
    },
    resetSelected: (state) => {
      state.selected = initialState.selected;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleSelected, resetSelected } = selectItemSlice.actions;
export default selectItemSlice.reducer;

export const selectSelected = (state) => state.selectItem.selected;
