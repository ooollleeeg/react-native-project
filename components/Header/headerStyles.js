import { StyleSheet } from "react-native";
import { fonts } from "../../components/utils/fonts";

export const headerStyles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 80,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  goBackBtn: {
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    fontFamily: fonts.robotoMedium,
    fontSize: 17,
    letterSpacing: -0.408,
    lineHeight: 22,
  },
});
