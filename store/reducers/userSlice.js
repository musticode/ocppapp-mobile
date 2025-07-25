import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  userId: null,
  userIdTagInfo: null,
  userToken: null,
  userEmail: null,
  userPhone: null,
  userRole: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserIdTagInfo: (state, action) => {
      state.userIdTagInfo = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserPhone: (state, action) => {
      state.userPhone = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    // Get functions (these are actually selectors, but keeping for consistency)
    getUserId: (state) => state.userId,
    getUserIdTagInfo: (state) => state.userIdTagInfo,
    getUserToken: (state) => state.userToken,
    getUserEmail: (state) => state.userEmail,
    getUserPhone: (state) => state.userPhone,
    getUserRole: (state) => state.userRole,
    // Clear functions
    clearUserData: (state) => {
      state.userId = null;
      state.userIdTagInfo = null;
      state.userToken = null;
      state.userEmail = null;
      state.userPhone = null;
      state.userRole = null;
    },
  },
});

export const {
  setUserId,
  setUserIdTagInfo,
  setUserToken,
  setUserEmail,
  setUserPhone,
  setUserRole,
  getUserId,
  getUserIdTagInfo,
  getUserToken,
  getUserEmail,
  getUserPhone,
  getUserRole,
  clearUserData,
} = userSlice.actions;

// Selectors for getting values
export const selectUserId = (state) => state.user.userId;
export const selectUserIdTagInfo = (state) => state.user.userIdTagInfo;
export const selectUserToken = (state) => state.user.userToken;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserPhone = (state) => state.user.userPhone;
export const selectUserRole = (state) => state.user.userRole;

export default userSlice.reducer;
