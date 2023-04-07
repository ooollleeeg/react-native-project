import { ImageBackground, View, ScrollView, Text } from "react-native";

import Avatar from "../../components/Avatar/Avatar";
import PostItem from "../../components/PostItem/PostItem";
import { globalStyles } from "../../components/utils/globalStyles";
import { photos } from "../../components/utils/imgTraining"; //Local photos for training - delete after end of project

const { imgBg, mainWrapper, title } = globalStyles;

const ProfileScreen = () => {
  return (
    <ImageBackground
      style={imgBg}
      source={require("../../assets/images/bgImage.jpg")}
    >
      <View
        style={{
          ...mainWrapper,
          flex: 0.8,
          paddingBottom: 16,
          alignItems: "center",
        }}
      >
        <Avatar isAvatar={true} />
        <Text style={title}>User Name</Text>
        <ScrollView>
          <View style={{ gap: 32 }}>
            {photos.map((photo) => {
              return (
                <View style={{ gap: 8 }} key={photo.id}>
                  <PostItem photo={photo} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
