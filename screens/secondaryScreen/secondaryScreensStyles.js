import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";
import { Dimensions } from "react-native";

export const secondaryScreensStyles = StyleSheet.create({
  mapWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  goBackBtn: {
    position: "absolute",
    bottom: 32,
    backgroundColor: "#BDBDBD",
    borderRadius: 8,
    padding: 8,
    alignSelf: "center",
  },
  textBtn: {
    fontFamily: fonts.robotoRegular,
    fontSize: 20,
    color: "#FFF",
  },
  commentIcon: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  inputStyle: {
    fontFamily: fonts.interMedium,
    fontSize: 16,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingRight: 50,
  },
});
