import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  avatar: null,
  isChangeUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      const { userId, userName, userEmail, avatar } = payload;
      return { ...state, userId, userName, userEmail, avatar };
    },
    updateAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
    logoutUser: () => initialState,
    changeUser: (state, { payload }) => ({
      ...state,
      isChangeUser: payload.isChangeUser,
    }),
  },
});
