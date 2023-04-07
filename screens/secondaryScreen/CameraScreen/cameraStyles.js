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
    bottom: 30,
  },
  othersBtnText: {
    fontSize: 20,
    color: "#FFF",
  },
  previewPhotoWrapper: {
    position: "absolute",
    left: 90,
    top: 70,
    width: 250,
    height: 250,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#FFF",
  },
  previewPhoto: {
    width: 248,
    height: 248,
    borderRadius: 16,
  },
});
