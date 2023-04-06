import { StyleSheet } from "react-native";
import { fonts } from "../utils/fonts";

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
  avatarBox: {
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  mainBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 50,
    marginTop: 43,
    borderRadius: 100,
  },
  mainBtnTitle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,
  },
  menuBtn: {
    width: 70,
    height: 40,
  },
  tabMenu: {
    height: 83,
    paddingTop: 9,
    boxShadow: "0px -0.5px 0px rgba(0, 0, 0, 0.3)",
  },
});
