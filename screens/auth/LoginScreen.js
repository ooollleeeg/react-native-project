import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Toast from "react-native-toast-message";

import { authStyles } from "./authStyles";
import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import { EyeOffIcon, EyeOnIcon } from "../../components/svg";
import {
  toastConfig,
  successLoginToast,
  errorFormToast,
} from "../../components/utils/toasts";

const {
  form,
  title,
  formInput,
  input,
  loginBtn,
  loginBtnTitle,
  showPasswordBtn,
  passwordInput,
  isAccount,
  isAccountText,
} = authStyles;

const initialUserData = {
  email: "",
  password: "",
};

const initialFocus = {
  email: false,
  password: false,
};

const LoginScreen = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isFocus, setIsFocus] = useState(initialFocus);
  const navigation = useNavigation();

  const handleGoToRegistration = () => {
    navigation.navigate("registration");
  };

  const handleFocus = (inputName) => {
    setIsKeyboard(true);
    setIsFocus((prevState) => ({ ...prevState, [inputName]: true }));
  };

  const handleEndFocus = (inputName) => {
    setIsKeyboard(false);
    setIsFocus((prevState) => ({ ...prevState, [inputName]: false }));
  };

  const onSubmitForm = () => {
    const { email, password } = userData;

    if (!email || !password) {
      errorFormToast();
      return;
    }
    successLoginToast();

    setIsKeyboard(false);
    console.log(userData);
    setUserData(initialUserData);
  };

  return (
    <KeyboardWrapper>
      <View
        style={{
          ...form,
          paddingBottom: isKeyboard ? 32 : 78,
        }}
      >
        <Text style={title}>Log In</Text>
        <View style={formInput}>
          <TextInput
            style={{
              ...input,
              borderColor: isFocus.email ? "#FF6C00" : "#E8E8E8",
            }}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            value={userData.email}
            onFocus={() => handleFocus("email")}
            onEndEditing={() => handleEndFocus("email")}
            onChangeText={(value) =>
              setUserData((prevState) => ({
                ...prevState,
                email: value.trim(),
              }))
            }
          />
          <View style={passwordInput}>
            <TextInput
              style={{
                ...input,
                borderColor: isFocus.password ? "#FF6C00" : "#E8E8E8",
              }}
              secureTextEntry={!isShowPassword}
              keyboardType="default"
              placeholder="Password"
              placeholderTextColor="#BDBDBD"
              value={userData.password}
              onFocus={() => handleFocus("password")}
              onEndEditing={() => handleEndFocus("password")}
              onChangeText={(value) =>
                setUserData((prevState) => ({
                  ...prevState,
                  password: value.trim(),
                }))
              }
            />
            <TouchableOpacity
              style={showPasswordBtn}
              activeOpacity={0.5}
              onPress={() => setIsShowPassword((prev) => !prev)}
            >
              {isShowPassword ? <EyeOnIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>
        </View>
        {!isKeyboard && (
          <>
            <TouchableOpacity
              style={loginBtn}
              activeOpacity={0.7}
              onPress={onSubmitForm}
            >
              <Text style={loginBtnTitle}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isAccount}
              activeOpacity={0.7}
              onPress={handleGoToRegistration}
            >
              <Text style={isAccountText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Toast position="top" topOffset={60} config={toastConfig} />
    </KeyboardWrapper>
  );
};

export default LoginScreen;
