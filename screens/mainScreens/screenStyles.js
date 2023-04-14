import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const screenStyles = StyleSheet.create({
  mainScreenWrapper: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  tabMenu: {
    height: 83,
    paddingTop: 9,
    boxShadow: "0px -0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginRight: 8,
  },
  avatarName: {
    fontFamily: fonts.robotoBold,
    fontSize: 15,
    lineHeight: 17,
    color: "#212121",
    marginBottom: 4,
  },
  avatarEmail: {
    fontFamily: fonts.robotoRegular,
    fontSize: 13,
    lineHeight: 15,
    color: "rgba(33, 33, 33, 0.8)",
  },

  imgTitle: {
    fontFamily: fonts.robotoMedium,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  cameraBox: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 8,
  },
  cameraIcon: {
    position: "absolute",
    top: "40%",
    left: "42%",
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputStyle: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
});
