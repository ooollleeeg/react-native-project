import { StyleSheet } from "react-native";
import { fonts } from "./fonts";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imgBg: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mainWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
  },

  title: {
    fontFamily: fonts.robotoMedium,
    fontSize: 30,
    paddingVertical: 32,
    letterSpacing: 0.2,
    lineHeight: 35,
    alignSelf: "center",
  },

  menuBtn: {
    width: 70,
    height: 40,
  },
});
