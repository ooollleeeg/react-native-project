import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Toast from "react-native-toast-message";

import { screenStyles } from "./screenStyles";
import { LogOutIcon } from "../../components/svg";
import PostItem from "../../components/PostItem/PostItem";
import { toastConfig, successLoginToast } from "../../components/utils/toasts";

const {
  header,
  headerTitle,
  logoutBtn,
  mainScreenWrapper,
  avatarImg,
  avatarName,
  avatarEmail,
} = screenStyles;

const PostsScreen = ({ route }) => {
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();
  const {
    userName,
    email,
    avatar,
    id,
    picture,
    title,
    descriptionLocation,
    latitude,
    longitude,
  } = route.params;

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
      <View style={header}>
        <Text style={headerTitle}>Posts</Text>
        <TouchableOpacity
          style={logoutBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("login")}
        >
          <LogOutIcon />
        </TouchableOpacity>
      </View>
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
          <View style={{ marginBottom: 32, gap: 8 }}>
            <PostItem photo={photo} fromScreen="posts" />
          </View>
        )}
      />
      <Toast position="top" topOffset={60} config={toastConfig} />
    </SafeAreaView>
  );
};

export default PostsScreen;
