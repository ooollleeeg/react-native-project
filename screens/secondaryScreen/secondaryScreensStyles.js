import { StyleSheet } from "react-native";
import { fonts } from "../../utils/fonts";
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
});
