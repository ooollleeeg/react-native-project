import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../../components/utils/globalStyles";
import { useFonts } from "expo-font";
import { fonts } from "../../components/utils/fonts";

const KeyboardWrapper = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const [fontsLoader] = useFonts({
    [fonts.robotoRegular]: require("../../assets/fonts/Roboto-Regular.ttf"),
    [fonts.robotoMedium]: require("../../assets/fonts/Roboto-Medium.ttf"),
    [fonts.robotoBold]: require("../../assets/fonts/Roboto-Bold.ttf"),
    [fonts.interMedium]: require("../../assets/fonts/Inter-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoader) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoader]);

  if (!fontsLoader) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{ ...globalStyles.container, width: dimensions }}
        onLayout={onLayoutRootView}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          {children}
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardWrapper;
