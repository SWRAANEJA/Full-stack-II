import { createSlice } from "@reduxjs/toolkit";

const platformsSlice = createSlice({
  name: "platforms",

  initialState: {
    list: [
      "Instagram",
      "Facebook",
      "Twitter",
      "LinkedIn",
      "YouTube",
    ],
  },

  reducers: {},
});

export default platformsSlice.reducer;