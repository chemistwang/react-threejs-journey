import { createSlice } from "@reduxjs/toolkit";

export const outletSlice = createSlice({
  name: "outlet",
  initialState: {
    value: 0,
    width: 0,
    height: 0,
    boxRef: null,
  },
  reducers: {
    setBoxSize: (state, action) => {
      // state.value += action.payload;
      console.log(state, action, "0-0-0-0-0-");
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setBoxRef: (state, action) => {
      state.boxRef = action.payload.boxRef;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBoxSize, setBoxRef } = outletSlice.actions;

export default outletSlice.reducer;
