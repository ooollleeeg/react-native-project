import { ImageBackground, View, FlatList, Text } from "react-native";
import { useState, useEffect } from "react";

import Avatar from "../../components/Avatar/Avatar";
import PostItem from "../../components/PostItem/PostItem";
import { LogoutBtn } from "../../components/Buttons";

import { globalStyles } from "../../components/utils/globalStyles";

const ProfileScreen = ({ route }) => {
  const [photos, setPhotos] = useState([]);
  const [avatarUri, setAvatarUri] = useState(null); // get from Redux or null
  const [user, setUser] = useState(null); // get from Redux or null

  const {
    userName,
    avatar,
    id,
    picture,
    title,
    descriptionLocation,
    latitude,
    longitude,
  } = route.params;

  useEffect(() => {
    setAvatarUri(avatar);
    setUser(userName);
  }, [route.params]);

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
    <ImageBackground
      style={globalStyles.imgBg}
      source={require("../../assets/images/bgImage.jpg")}
    >
      <View
        style={{
          ...globalStyles.mainWrapper,
          flex: 0.8,
          paddingBottom: 16,
        }}
      >
        <Avatar photoUri={avatarUri} fromScreen="profile" />
        <LogoutBtn />
        <Text style={globalStyles.title}>{user}</Text>
        <FlatList
          data={photos}
          keyExtractor={(photo) => photo.id}
          renderItem={(photo) => (
            <View style={{ marginBottom: 32 }}>
              <PostItem photo={photo} fromScreen="profile" />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
