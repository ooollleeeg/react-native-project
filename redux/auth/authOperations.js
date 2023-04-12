import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authRegistration =
  ({ userName, email, password, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatar,
      });
      const userRegistered = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: userRegistered.uid,
          userName: userRegistered.displayName,
          email: userRegistered.email,
          avatar: userRegistered.photoURL,
        })
      );
    } catch (error) {
      return error.message;
    }
  };
export const authLogin = () => async (dispatch, selectState) => {};
export const authLogout = () => async (dispatch, selectState) => {};
