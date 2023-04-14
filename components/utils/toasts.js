import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";

export const successLoginToast = () =>
  Toast.show({
    type: "success",
    text1: "You have logged in",
    text2: "Manage your ImageBook collection",
  });

export const successDeleteAvatarToast = () =>
  Toast.show({
    type: "success",
    text1: "Congratulation!",
    text2: "Your avatar was deleted",
  });

export const successAddPostToast = () =>
  Toast.show({
    type: "info",
    text1: "Your new post was added",
    text2: "Like it and leave a comment :)",
  });

export const errorRegistrationToast = () =>
  Toast.show({
    type: "error",
    text1: "Registration is not possible!",
    text2: "This email is already registered",
  });

export const errorLoginToast = () =>
  Toast.show({
    type: "error",
    text1: "Email or password is wrong",
    text2: "Check them and try again",
  });

export const errorFormToast = () =>
  Toast.show({
    type: "error",
    text1: "Error. What a shame!",
    text2: "Avatar and all fields must not be empty",
  });

export const errorCommentsToast = () =>
  Toast.show({
    type: "error",
    text1: "Comment must not be empty",
    text2: "No less than 10 and <200 characters",
  });

export const errorAcceptCameraToast = () =>
  Toast.show({
    type: "error",
    text1: "You have not given permission",
    text2: "Access location was denied",
  });

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      text1Style={{
        color: "green",
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
        color: "gray",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        color: "red",
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
        color: "gray",
      }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: "blue" }}
      text1Style={{
        color: "darkblue",
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
        color: "gray",
      }}
    />
  ),
};
