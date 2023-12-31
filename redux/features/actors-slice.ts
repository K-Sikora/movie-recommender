import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  id: string;
  name: string;
  profile_path: string;
};

export const actors = createSlice({
  name: "actors",
  initialState: [] as InitialState[],
  reducers: {
    update: (state, action: PayloadAction<InitialState>) => {
      return [...state, action.payload];
    },
    remove: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      return state.filter((item) => item.id !== idToRemove);
    },
  },
});

export const { update, remove } = actors.actions;
export default actors.reducer;
