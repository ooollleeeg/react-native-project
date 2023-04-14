import { StyleSheet } from "react-native";

export const cameraStyles = StyleSheet.create({
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  cameraBtnWrapper: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  cameraBtnOut: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtnInner: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
  othersBtn: {
    position: "absolute",
    bottom: 26,
  },

  previewPhotoWrapper: {
    position: "absolute",
    top: 48,
    alignSelf: "center",
    width: "92%",
    height: "45%",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  previewPhoto: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
