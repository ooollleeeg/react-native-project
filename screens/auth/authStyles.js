import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const authStyles = StyleSheet.create({
  input: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    color: "#000",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  showPasswordBtn: {
    marginLeft: -60,
  },
  isAccount: {
    marginTop: 16,
  },
  isAccountText: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    color: "#1B4371",
    alignSelf: "center",
  },
});
