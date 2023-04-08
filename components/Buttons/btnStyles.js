import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const btnStyles = StyleSheet.create({
  mainBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 32,
    borderRadius: 100,
  },
  mainBtnTitle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,
  },
});
