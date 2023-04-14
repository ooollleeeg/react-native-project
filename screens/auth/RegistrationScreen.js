import { useState, useEffect } from "react";
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
import Avatar from "../../components/Avatar/Avatar";
import { MainButton } from "../../components/Buttons";

import { EyeOffIcon, EyeOnIcon } from "../../components/svg";
import {
  errorFormToast,
  errorRegistrationToast,
} from "../../components/utils/toasts";

import { authRegistration } from "../../redux/auth/authOperations";

const { input, showPasswordBtn, passwordInput, isAccount, isAccountText } =
  authStyles;

const initialUserData = {
  userName: "",
  userEmail: "",
  password: "",
  avatar: null,
};

const initialFocus = {
  userName: false,
  userEmail: false,
  password: false,
};

const RegistrationScreen = ({ route }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isFocus, setIsFocus] = useState(initialFocus);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({ ...userData, avatar: route.params?.photoUri });
  }, [route.params]);

  const handleGoToLogin = () => {
    navigation.navigate("login");
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
    const { userName, userEmail, password, avatar } = userData;

    if (!userName || !userEmail || !password || !avatar) {
      errorFormToast();
      return;
    }

    setIsKeyboard(false);

    dispatch(authRegistration(userData)).then((res) => {
      const isUserExistInDB = !!res;

      if (isUserExistInDB) {
        errorRegistrationToast();
        return;
      } else {
        setUserData(initialUserData);
        navigation.navigate("home");
      }
    });
  };

  // add prop for Avatar for change icon

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
          <Avatar fromScreen="registration" />
          <Text style={globalStyles.title}>Registration</Text>
          <View>
            <TextInput
              style={{
                ...input,
                borderColor: isFocus.userName ? "#FF6C00" : "#E8E8E8",
              }}
              keyboardType="default"
              placeholder="Login"
              placeholderTextColor="#BDBDBD"
              value={userData.userName}
              onFocus={() => handleFocus("userName")}
              onEndEditing={() => handleEndFocus("userName")}
              onChangeText={(value) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userName: value,
                }))
              }
            />
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
                title="Register"
                isActive={true}
              />
              <TouchableOpacity
                style={isAccount}
                activeOpacity={0.7}
                onPress={handleGoToLogin}
              >
                <Text style={isAccountText}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </KeyboardWrapper>
  );
};

export default RegistrationScreen;
