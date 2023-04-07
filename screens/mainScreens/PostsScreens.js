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
import { photos as initialPhotos } from "../../components/utils/imgTraining"; //Local photos for training - delete after end of project

const {
  header,
  headerTitle,
  logoutBtn,
  mainScreenWrapper,
  avatar,
  avatarName,
  avatarEmail,
} = screenStyles;

const PostsScreen = ({ route }) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const { userName, email, photoUri } = route.params;
  const navigation = useNavigation();

  useEffect(() => successLoginToast(), []);

  const handleLogout = () => {
    navigation.navigate("login");
  };

  return (
    <SafeAreaView style={{ marginBottom: 200 }}>
      <View style={header}>
        <Text style={headerTitle}>Posts</Text>
        <TouchableOpacity
          style={logoutBtn}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <LogOutIcon />
        </TouchableOpacity>
      </View>
      <View style={mainScreenWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={avatar}
            source={{ uri: photoUri }} //Local photo for training - delete after end of project
          ></Image>
          <View>
            <Text style={avatarName}>{userName}</Text>
            <Text style={avatarEmail}>{email}</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={{ paddingLeft: 16 }}
        data={photos}
        keyExtractor={(photo) => photo.id}
        renderItem={(photo) => (
          <View style={{ marginBottom: 32, gap: 8 }}>
            <PostItem photo={photo} />
          </View>
        )}
      />
      <Toast position="top" topOffset={60} config={toastConfig} />
    </SafeAreaView>
  );
};

export default PostsScreen;
