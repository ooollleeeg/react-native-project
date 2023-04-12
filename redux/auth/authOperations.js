import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authRegistration =
  ({ userName, userEmail, password, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatar,
      });
      // const userRegistered = auth.currentUser;
      const { uid, displayName, email, photoURL } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
          isChangeUser: true,
        })
      );
    } catch (error) {
      return error.message;
    }
  };

export const authLogin =
  ({ userEmail, password }) =>
  async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const { displayName, email, photoURL, uid } = user;

      dispatch(
        authSlice.actions.updateUser({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
        })
      );

      return { user };
    } catch (error) {
      return error.message;
    }
  };

export const authLogout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.logoutUser());
    // dispatch(postsSlice.actions.reset());
  } catch (error) {
    return error.message;
  }
};

export const authChangeUser = () => {};

export const changeAvatar = (avatar) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, { photoURL: avatar });
    dispatch(authSlice.actions.updateAvatar({ avatar }));
  } catch (error) {
    return error.message;
  }
};
