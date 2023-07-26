import { configureStore } from "@reduxjs/toolkit";
import outletReducer from "./outlet";

export default configureStore({
  reducer: {
    outlet: outletReducer,
  },
});
