import { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

import { screenStyles } from "./screenStyles";
import {
  ArrowLeftIcon,
  CameraIcon,
  MapPinIcon,
  TrashIcon,
} from "../../components/svg";
import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import MainButton from "../../components/Buttons/MainButton";

const {
  header,
  headerTitle,
  goBackBtn,
  cameraBox,
  camera,
  createPhotoText,
  inputStyle,
} = screenStyles;

const initialValue = {
  id: null,
  picture: "",
  title: "",
  descriptionLocation: "",
  latitude: null,
  longitude: null,
};

const CreatePostsScreen = ({ route }) => {
  const [value, setValue] = useState(initialValue);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const navigation = useNavigation();

  const { id, picture, title, descriptionLocation, latitude, longitude } =
    value;

  useEffect(() => {
    setValue({
      ...value,
      picture: route.params?.photoUri,
      latitude: route.params?.location.latitude,
      longitude: route.params?.location.longitude,
      id: uuidv4(),
    });
  }, [route.params]);

  useEffect(() => {
    if (title && descriptionLocation && picture) {
      setIsActiveBtn(true);
    } else setIsActiveBtn(false);
  }, [title, descriptionLocation, picture]);

  const handleChangeInput = (name, value) => {
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitForm = () => {
    setIsKeyboard(false);
    setValue(initialValue);
    navigation.navigate("Profile", {
      id,
      picture,
      title,
      descriptionLocation,
      latitude,
      longitude,
    }); // Delete after Redux
    navigation.navigate("Posts", {
      id,
      picture,
      title,
      descriptionLocation,
      latitude,
      longitude,
    }); // Delete after Redux
  };

  return (
    <KeyboardWrapper>
      <View style={header}>
        <TouchableOpacity
          style={goBackBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Posts")}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={headerTitle}>Create post</Text>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <View>
            {!picture && (
              <>
                <TouchableOpacity
                  style={cameraBox}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate("camera", {
                      fromScreen: "createPost",
                    });
                  }}
                >
                  <View style={camera}>
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
                <Text style={createPhotoText}> Download photo</Text>
              </>
            )}
            {photoUri && (
              <>
                <TouchableOpacity
                  style={cameraBox}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate("camera", { fromScreen: "createPost" });
                  }}
                >
                  <Image
                    style={{ height: 240, width: "100%", borderRadius: 8 }}
                    source={{ uri: picture }}
                  />
                  <View style={camera}>
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
                <Text style={createPhotoText}> Edit photo</Text>
              </>
            )}
          </View>

          <View style={{ paddingTop: 32, gap: 16 }}>
            <TextInput
              style={{ ...createPhotoText, ...inputStyle }}
              keyboardType="default"
              placeholder="Name..."
              placeholderTextColor="#BDBDBD"
              value={value.title}
              onFocus={() => setIsKeyboard(true)}
              onEndEditing={() => setIsKeyboard(false)}
              onChangeText={(value) => handleChangeInput("title", value)}
            />
            <TextInput
              style={{ ...createPhotoText, ...inputStyle, paddingLeft: 28 }}
              keyboardType="default"
              placeholder="Place..."
              placeholderTextColor="#BDBDBD"
              value={value.descriptionLocation}
              onFocus={() => setIsKeyboard(true)}
              onEndEditing={() => setIsKeyboard(false)}
              onChangeText={(value) =>
                handleChangeInput("descriptionLocation", value)
              }
            ></TextInput>
            <MapPinIcon style={{ position: "absolute", bottom: 28 }} />
          </View>
          {!isKeyboard && (
            <>
              <MainButton
                title="Publish"
                onSubmitForm={onSubmitForm}
                isActive={isActiveBtn}
              />
            </>
          )}
        </View>
      </ScrollView>
      {!isKeyboard && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 16, alignSelf: "center" }}
          onPress={() => setValue(initialValue)}
          disabled={!isActiveBtn}
        >
          <TrashIcon isActive={isActiveBtn} />
        </TouchableOpacity>
      )}
    </KeyboardWrapper>
  );
};

export default CreatePostsScreen;
