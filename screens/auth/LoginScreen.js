import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";

import { authStyles } from "./authStyles";
import { globalStyles } from "../../components/utils/globalStyles";
import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import { MainButton } from "../../components/Buttons";
import { EyeOffIcon, EyeOnIcon } from "../../components/svg";
import { errorFormToast, errorLoginToast } from "../../components/utils/toasts";
import { authLogin } from "../../redux/auth/authOperations";

const { input, showPasswordBtn, passwordInput, isAccount, isAccountText } =
  authStyles;

const initialUserData = {
  userEmail: "",
  password: "",
};

const initialFocus = {
  userEmail: false,
  password: false,
};

const LoginScreen = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isFocus, setIsFocus] = useState(initialFocus);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    const { userEmail, password } = userData;

    if (!userEmail || !password) {
      errorFormToast();
      return;
    }

    setIsKeyboard(false);

    dispatch(authLogin(userData)).then((res) => {
      const isUserExistInDB = res.user;

      if (!isUserExistInDB) {
        errorLoginToast();
        return;
      } else {
        setUserData(initialUserData);
        navigation.navigate("home");
      }
    });
  };

  return (
    <KeyboardWrapper>
      <ImageBackground
        style={globalStyles.imgBg}
        source={require("../../assets/images/bgImage.jpg")}
      >
        <View
          style={{
            ...globalStyles.mainWrapper,
            paddingBottom: isKeyboard ? 32 : 78,
          }}
        >
          <Text style={globalStyles.title}>Log In</Text>
          <View>
            <TextInput
              style={{
                ...input,
                marginBottom: 16,
                borderColor: isFocus.userEmail ? "#FF6C00" : "#E8E8E8",
              }}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#BDBDBD"
              value={userData.userEmail}
              onFocus={() => handleFocus("userEmail")}
              onEndEditing={() => handleEndFocus("userEmail")}
              onChangeText={(value) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userEmail: value.trim(),
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
              <MainButton
                onSubmitForm={onSubmitForm}
                title="Log In"
                isActive={true}
              />
              <TouchableOpacity
                style={isAccount}
                activeOpacity={0.7}
                onPress={handleGoToRegistration}
              >
                <Text style={isAccountText}>
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </KeyboardWrapper>
  );
};

export default LoginScreen;
