import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import { store } from "./redux/store";
import { toastConfig } from "./components/utils/toasts";
import Main from "./components/Main/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
      <Toast position="top" topOffset={60} config={toastConfig} />
    </Provider>
  );
}
