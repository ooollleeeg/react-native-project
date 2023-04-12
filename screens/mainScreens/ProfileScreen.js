import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ImageBackground, View, FlatList, Text } from "react-native";

import Avatar from "../../components/Avatar/Avatar";
import PostItem from "../../components/PostItem/PostItem";
import { LogoutBtn } from "../../components/Buttons";
import { selectUser } from "../../redux/auth/authSelectors";
import { globalStyles } from "../../components/utils/globalStyles";

const ProfileScreen = ({ route }) => {
  const { userName, avatar } = useSelector(selectUser);
  const [photos, setPhotos] = useState([]);
  // const [avatarUri, setAvatarUri] = useState(null); // get from Redux or null
  // const [user, setUser] = useState(null); // get from Redux or null

  const { id, picture, title, descriptionLocation, latitude, longitude } =
    route.params;

  // useEffect(() => {
  //   setAvatarUri(avatar);
  //   setUser(userName);
  // }, [route.params]);

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
        <Avatar photoUri={avatar} fromScreen="profile" />
        <LogoutBtn />
        <Text style={globalStyles.title}>{userName}</Text>
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
