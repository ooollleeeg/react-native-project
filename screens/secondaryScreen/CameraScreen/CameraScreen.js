import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

import { cameraStyles } from "./cameraStyles";
import {
  toastConfig,
  errorAcceptCameraToast,
} from "../../../components/utils/toasts";
import { SavePhotoIcon, FlipIcon } from "../../../components/svg";
import { Loading } from "../../../components/utils/loading";
import { changeAvatar } from "../../../redux/auth/authOperations";
const {
  photoView,
  cameraBtnWrapper,
  cameraBtnOut,
  cameraBtnInner,
  othersBtn,

  previewPhotoWrapper,
  previewPhoto,
} = cameraStyles;

const CameraScreen = ({ route }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fromScreen = route.params.fromScreen;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (status === "granted" && locationStatus.status === "granted") {
        setHasPermission(true);
      } else errorAcceptCameraToast();
    })();
  }, []);

  const makePhoto = async () => {
    setLoading(true);
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    const location = await Location.getCurrentPositionAsync();
    setLoading(false);
    setLocation(location.coords);
    setPhoto(uri);
  };

  const savePhoto = () => {
    dispatch(changeAvatar(photo));

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
    <>
      {loading && (
        <Loading loading={loading} title="Just second. Making photo..." />
      )}
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
                <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
                  {format(Date.now(), "	PPpp")}
                </Text>
              </View>
            )}
            <View style={photoView}>
              <TouchableOpacity
                style={{ ...othersBtn, left: 60 }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <FlipIcon />
              </TouchableOpacity>
              <TouchableOpacity style={cameraBtnWrapper} onPress={makePhoto}>
                <View style={cameraBtnOut}>
                  <View style={cameraBtnInner}></View>
                </View>
              </TouchableOpacity>
              {photo && (
                <TouchableOpacity
                  style={{ ...othersBtn, right: 60 }}
                  onPress={savePhoto}
                >
                  <SavePhotoIcon />
                </TouchableOpacity>
              )}
            </View>
          </Camera>
        ) : (
          <View></View>
        )}

        <Toast position="top" topOffset={60} config={toastConfig} />
      </View>
    </>
  );
};

export default CameraScreen;
