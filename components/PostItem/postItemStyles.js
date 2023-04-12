import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const postItemStyles = StyleSheet.create({
  imgTitle: {
    fontFamily: fonts.robotoMedium,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingVertical: 8,
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,

    marginLeft: 6,
  },
  locationStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 6,
  },
});
