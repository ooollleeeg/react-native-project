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
import { useSelector, useDispatch } from "react-redux";

import { screenStyles } from "./screenStyles";
import { CameraIcon, MapPinIcon, TrashIcon } from "../../components/svg";
import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import { MainButton } from "../../components/Buttons";
import Header from "../../components/Header/Header";
import { selectPictureData } from "../../redux/posts/postsSelectors";
import {
  uploadPostToServer,
  getPosts,
} from "../../redux/posts/postsOperations";
import { successAddPostToast } from "../../components/utils/toasts";

const { cameraBox, cameraIcon, textStyle, inputStyle } = screenStyles;

const initialValue = {
  picture: null,
  title: null,
  descriptionLocation: null,
  latitude: null,
  longitude: null,
  likes: 0,
  countComments: 0,
};

const CreatePostsScreen = () => {
  const [value, setValue] = useState(initialValue);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const navigation = useNavigation();
  const { picture, latitude, longitude } = useSelector(selectPictureData);
  const dispatch = useDispatch();

  const { title, descriptionLocation } = value;

  useEffect(() => {
    setValue({ ...value, picture, latitude, longitude });
  }, [picture, latitude, longitude]);

  useEffect(() => {
    if (title && descriptionLocation && picture) {
      setIsActiveBtn(true);
    } else setIsActiveBtn(false);
  }, [title, descriptionLocation, picture]);

  const handleChangeInput = (name, value) => {
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitForm = () => {
    dispatch(uploadPostToServer(value));
    dispatch(getPosts());
    setIsKeyboard(false);
    setValue(initialValue);

    successAddPostToast();
    navigation.navigate("Posts");
  };

  return (
    <KeyboardWrapper>
      <Header title="Create post" />
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
                  <View style={cameraIcon}>
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
                <Text style={textStyle}> Download photo</Text>
              </>
            )}
            {picture && (
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
                  <View style={cameraIcon}>
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
                <Text style={textStyle}> Edit photo</Text>
              </>
            )}
          </View>

          <View style={{ paddingTop: 32 }}>
            <TextInput
              style={{ ...textStyle, ...inputStyle, marginBottom: 16 }}
              keyboardType="default"
              placeholder="Name..."
              placeholderTextColor="#BDBDBD"
              value={value.title}
              onFocus={() => setIsKeyboard(true)}
              onEndEditing={() => setIsKeyboard(false)}
              onChangeText={(value) => handleChangeInput("title", value)}
            />
            <View style={{ justifyContent: "center" }}>
              <TextInput
                style={{ ...textStyle, ...inputStyle, paddingLeft: 28 }}
                keyboardType="default"
                placeholder="Place..."
                placeholderTextColor="#BDBDBD"
                value={value.descriptionLocation}
                onFocus={() => setIsKeyboard(true)}
                onEndEditing={() => setIsKeyboard(false)}
                onChangeText={(value) =>
                  handleChangeInput("descriptionLocation", value)
                }
              />
              <MapPinIcon style={{ position: "absolute" }} />
            </View>
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
