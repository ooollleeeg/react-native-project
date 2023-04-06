import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";

export const successRegistrationToast = () =>
  Toast.show({
    type: "success",
    text1: "You have registered",
    text2: "Enjoy creating your own ImageBook",
  });

export const successLoginToast = () =>
  Toast.show({
    type: "success",
    text1: "You have logged in",
    text2: "Manage your ImageBook collection",
  });

export const errorFormToast = () =>
  Toast.show({
    type: "error",
    text1: "Error. What a shame!",
    text2: "All fields must not be empty",
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
