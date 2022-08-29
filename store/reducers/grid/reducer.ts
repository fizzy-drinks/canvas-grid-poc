import { createReducer } from "@reduxjs/toolkit";
import move from "./actions/move";
import gridInitialState from "./initialState";
import GridState from "./state";

const GridReducer = createReducer<GridState>(gridInitialState, builder => {
  builder.addCase(move.fulfilled, (state, action) => {
    state.x = action.payload.x;
    state.y = action.payload.y;
    state.init = true;
  })
  builder.addCase(move.rejected, console.error);
})

export default GridReducer;
