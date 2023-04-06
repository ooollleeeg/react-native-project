import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const authStyles = StyleSheet.create({
  form: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  addAvatar: {
    marginTop: -60,
    width: 132,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarBtn: {
    marginTop: 81,
    marginLeft: 119.5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.robotoMedium,
    fontSize: 30,
    paddingVertical: 32,
    letterSpacing: 0.2,
    lineHeight: 35,
  },
  formInput: {
    gap: 16,
  },
  input: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    width: 343,
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
  loginBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 50,
    backgroundColor: "#FF6C00",
    marginTop: 43,
    borderRadius: 100,
  },
  loginBtnTitle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  isAccount: {
    marginTop: 16,
  },
  isAccountText: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    color: "#1B4371",
  },
});
