import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { SafeAreaView, View, Text, Image, FlatList } from "react-native";
import Toast from "react-native-toast-message";

import { toastConfig, successLoginToast } from "../../components/utils/toasts";
import { screenStyles } from "./screenStyles";

import PostItem from "../../components/PostItem/PostItem";
import Header from "../../components/Header/Header";
import { selectUser } from "../../redux/auth/authSelectors";

const { mainScreenWrapper, avatarImg, avatarName, avatarEmail } = screenStyles;

const PostsScreen = ({ route }) => {
  const { userName, email, avatar } = useSelector(selectUser);
  const [photos, setPhotos] = useState([]);

  const { id, picture, title, descriptionLocation, latitude, longitude } =
    route.params;

  useEffect(() => successLoginToast(), []);

  // Delete after Redux
  useEffect(() => {
    if (id) {
      setPhotos((prev) => [
        ...prev,
        {
          id,
          picture,
          title,
          descriptionLocation,
          latitude,
          longitude,
          comments: [],
        },
      ]);
    }
  }, [id]);

  return (
    <SafeAreaView style={{ marginBottom: 200 }}>
      <Header title="Posts" />
      <View style={mainScreenWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={avatarImg}
            source={{ uri: avatar }} //Local photo for training - delete after end of project
          ></Image>
          <View>
            <Text style={avatarName}>{userName}</Text>
            <Text style={avatarEmail}>{email}</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={photos}
        keyExtractor={(photo) => photo.id}
        renderItem={(photo) => (
          <View style={{ marginBottom: 32 }}>
            <PostItem photo={photo} fromScreen="posts" />
          </View>
        )}
      />
      <Toast position="top" topOffset={60} config={toastConfig} />
    </SafeAreaView>
  );
};

export default PostsScreen;
