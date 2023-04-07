import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";

import { screenStyles } from "./screenStyles";
import { LogOutIcon } from "../../components/svg";
import PostItem from "../../components/PostItem/PostItem";
import { toastConfig, successLoginToast } from "../../components/utils/toasts";
import { photos } from "../../components/utils/imgTraining"; //Local photos for training - delete after end of project

const {
  header,
  headerTitle,
  logoutBtn,
  mainScreenWrapper,
  avatar,
  avatarName,
  avatarEmail,
  imgWrapper,
} = screenStyles;

const PostsScreen = ({ route }) => {
  const {
    userData: { userName, email },
  } = route.params;
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
            source={require("../../assets/images/imgTraining/-5188596587406932582_121.jpg")} //Local photo for training - delete after end of project
          ></Image>
          <View>
            <Text style={avatarName}>{userName}</Text>
            <Text style={avatarEmail}>{email}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ ...imgWrapper, paddingLeft: 16 }}>
          {photos.map((photo) => {
            return (
              <View style={{ gap: 8 }} key={photo.id}>
                <PostItem photo={photo} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Toast position="top" topOffset={60} config={toastConfig} />
    </SafeAreaView>
  );
};

export default PostsScreen;
