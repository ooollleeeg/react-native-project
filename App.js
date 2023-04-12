import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/mainScreens/Home";
import CameraScreen from "./screens/secondaryScreen/CameraScreen/CameraScreen";
import MapScreen from "./screens/secondaryScreen/MapScreen";
import CommentsScreen from "./screens/secondaryScreen/CommentsScreen";

export default function App() {
  const AuthStack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator
          initialRouteName="login"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen
            name="registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen name="login" component={LoginScreen} />
          <AuthStack.Screen name="home" component={Home} />
          <AuthStack.Screen name="camera" component={CameraScreen} />
          <AuthStack.Screen name="map" component={MapScreen} />
          <AuthStack.Screen name="comments" component={CommentsScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
