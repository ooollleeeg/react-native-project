import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function MapScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/cafee.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "IOS" ? "padding" : "height=25"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 0 : 100,
              }}
            >
              <Text style={styles.inputTitle}>Реєстрація</Text>
              <View style={{ marginTop: 23 }}>
                <TextInput
                  style={styles.textInput}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  placeholder="Login"
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.textInput}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  placeholder="Email"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  textAlign={"left"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={keyboardHide}
              >
                <Text style={styles.titleBtn}>Зареєструватись</Text>
              </TouchableOpacity>
              <Text style={styles.afterBtn}>Вже є аккаунт? Увійти</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    padding: 30,

    backgroundColor: "#f0ffff",
    borderRadius: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#800080",
    height: 40,
    color: "#212121",
    fontSize: 25,
    fontWeight: "bold",
    borderRadius: 8,
    paddingLeft: 16,
  },
  inputTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    height: 50,
    // fontFamily: "Roboto-Regular",
  },
  button: {
    height: 51,
    marginTop: 43,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: { backgroundColor: "transparent" },
      android: { backgroundColor: "#ff6c00" },
    }),
  },
  titleBtn: {
    fontSize: 16,
    color: "#f0ffff",
  },
  afterBtn: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
  },
});
