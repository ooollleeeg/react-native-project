import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { cameraStyles } from "./cameraStyles";

const {
  photoView,
  cameraBtnWrapper,
  cameraBtnOut,
  cameraBtnInner,
  othersBtn,
  previewPhotoWrapper,
  previewPhoto,
} = cameraStyles;

const CameraOpen = () => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const makePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    setPhoto(uri);
  };

  const savePhoto = () => {
    // add save in Redux storage
    navigation.navigate("registration");
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
              style={{ ...othersBtn, left: 70 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 24, color: "#FFF" }}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cameraBtnWrapper} onPress={makePhoto}>
              <View style={cameraBtnOut}>
                <View style={cameraBtnInner}></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...othersBtn, right: 20 }}
              onPress={savePhoto}
            >
              <Text style={{ fontSize: 24, color: "#FFF" }}>Save photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View></View>
      )}
    </View>
  );
};

CameraOpen.propTypes = {
  onTakePhoto: PropTypes.func,
};

export default CameraOpen;
