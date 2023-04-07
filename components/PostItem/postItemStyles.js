import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const postItemStyles = StyleSheet.create({
  imgTitle: {
    fontFamily: fonts.robotoMedium,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberCommentsStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
    marginRight: 40,
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
