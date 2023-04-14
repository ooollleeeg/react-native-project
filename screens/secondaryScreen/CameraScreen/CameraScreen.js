import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

import { cameraStyles } from "./cameraStyles";
import { errorAcceptCameraToast } from "../../../components/utils/toasts";
import { SavePhotoIcon, FlipIcon } from "../../../components/svg";
import { Loading } from "../../../components/utils/loading";
import { changeAvatar } from "../../../redux/auth/authOperations";
import { storage } from "../../../firebase/config";
import { postsSlice } from "../../../redux/posts/postsSlice";

const {
  photoView,
  cameraBtnWrapper,
  cameraBtnOut,
  cameraBtnInner,
  othersBtn,
  previewPhotoWrapper,
  previewPhoto,
  previewPhotoDate,
} = cameraStyles;

const CameraScreen = ({ route }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
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

  const uploadPhotoToServer = async () => {
    const { uri } = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    const res = await fetch(uri);
    const file = await res.blob();
    const uniqueId = Date.now().toString();
    const storageRef =
      fromScreen === "createPost"
        ? ref(storage, `postsImages/post_${uniqueId}`)
        : ref(storage, `avatarPhoto/avatar_${uniqueId}`);

    try {
      await uploadBytes(storageRef, file);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  };

  const savePhoto = async () => {
    const downloadedPhoto = await uploadPhotoToServer();
    if (fromScreen === "createPost") {
      dispatch(
        postsSlice.actions.updatePicture({
          picture: downloadedPhoto,
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
    } else dispatch(changeAvatar(downloadedPhoto));

    switch (fromScreen) {
      case "registration":
        navigation.navigate("registration", { photoUri: downloadedPhoto });
        break;
      case "profile":
        navigation.navigate("Profile", { photoUri: downloadedPhoto });
        break;
      case "createPost":
        navigation.navigate("CreatePost");
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
                <ImageBackground source={{ uri: photo }} style={previewPhoto}>
                  <Text style={previewPhotoDate}>
                    {format(Date.now(), "	PPpp")}
                  </Text>
                </ImageBackground>
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
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 100,
                  alignSelf: "center",
                }}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: "#FFF", fontSize: 20 }}>Go back</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View></View>
        )}
      </View>
    </>
  );
};

export default CameraScreen;
