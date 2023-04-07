import { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

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

const initialValue = { title: "", location: "" };

const CreatePostsScreen = () => {
  const [value, setValue] = useState(initialValue);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const navigation = useNavigation();

  const { title, location } = value;

  useEffect(() => {
    if (title && location) {
      setIsActiveBtn(true);
    } else setIsActiveBtn(false);
  }, [title, location]);

  const handleGoBack = () => {
    navigation.navigate("Posts");
  };

  const handleChangeInput = (name, value) => {
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const clearInputs = () => {
    setValue(initialValue);
  };

  const onSubmitForm = () => {
    const { title, location } = value;
    console.log({ title, location });
    setIsKeyboard(false);
    setValue(initialValue);
    handleGoBack();
  };

  return (
    <KeyboardWrapper>
      <View style={header}>
        <TouchableOpacity
          style={goBackBtn}
          activeOpacity={0.7}
          onPress={handleGoBack}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={headerTitle}>Create post</Text>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <View>
            <TouchableOpacity style={cameraBox} activeOpacity={0.7}>
              <View style={camera}>
                <CameraIcon />
              </View>
            </TouchableOpacity>
            <Text style={createPhotoText}> Upload photo</Text>
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
              value={value.location}
              onFocus={() => setIsKeyboard(true)}
              onEndEditing={() => setIsKeyboard(false)}
              onChangeText={(value) => handleChangeInput("location", value)}
            ></TextInput>
            <MapPinIcon style={{ position: "absolute", bottom: 29 }} />
          </View>
          {!isKeyboard && (
            <>
              <MainButton
                title="Publish"
                onSubmitForm={{ onSubmitForm }}
                isActive={isActiveBtn}
              />
            </>
          )}
        </View>
      </ScrollView>
      {!isKeyboard && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 0, alignSelf: "center" }}
          onPress={clearInputs}
          disabled={!isActiveBtn}
        >
          <TrashIcon />
        </TouchableOpacity>
      )}
    </KeyboardWrapper>
  );
};

export default CreatePostsScreen;
