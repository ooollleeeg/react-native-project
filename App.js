import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/mainScreens/Home";
import CommentsScreen from "./screens/secondaryScreen/CommentsScreen";

export default function App() {
  const AuthStack = createStackNavigator();

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="registration"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="registration" component={RegistrationScreen} />
        <AuthStack.Screen name="login" component={LoginScreen} />
        <AuthStack.Screen name="home" component={Home} />
        <AuthStack.Screen name="camera" component={CommentsScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
