import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

import { cameraStyles } from "./cameraStyles";
import {
  toastConfig,
  errorAcceptCamera,
} from "../../../components/utils/toasts";

const {
  photoView,
  cameraBtnWrapper,
  cameraBtnOut,
  cameraBtnInner,
  othersBtn,
  othersBtnText,
  previewPhotoWrapper,
  previewPhoto,
} = cameraStyles;

const CameraScreen = ({ route }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  const fromScreen = route.params.fromScreen;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (status === "granted" && locationStatus.status === "granted") {
        setHasPermission(true);
      } else errorAcceptCamera();
    })();
  }, []);

  const makePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    const location = await Location.getCurrentPositionAsync();
    setLocation(location.coords);
    setPhoto(uri);
  };

  const savePhoto = () => {
    // add save in Redux storage
    switch (fromScreen) {
      case "registration":
        navigation.navigate("registration", { photoUri: photo });
        break;
      case "profile":
        navigation.navigate("Profile", { photoUri: photo });
        break;
      case "createPost":
        navigation.navigate("CreatePost", {
          photoUri: photo,
          location: location,
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission ? (
        <Camera
          style={{ flex: 1 }}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo && (
            <View style={previewPhotoWrapper}>
              <Image source={{ uri: photo }} style={previewPhoto} />
              <Text style={{ color: "#FFF", fontSize: 16 }}>
                {format(Date.now(), "	PPpp")}
              </Text>
            </View>
          )}
          <View style={photoView}>
            <TouchableOpacity
              style={{ ...othersBtn, left: 50 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={othersBtnText}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cameraBtnWrapper} onPress={makePhoto}>
              <View style={cameraBtnOut}>
                <View style={cameraBtnInner}></View>
              </View>
            </TouchableOpacity>
            {photo && (
              <TouchableOpacity
                style={{ ...othersBtn, right: 30 }}
                onPress={savePhoto}
              >
                <Text style={othersBtnText}>Save photo</Text>
              </TouchableOpacity>
            )}
          </View>
        </Camera>
      ) : (
        <View></View>
      )}

      <Toast position="top" topOffset={60} config={toastConfig} />
    </View>
  );
};

export default CameraScreen;
