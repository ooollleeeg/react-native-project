import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import { screenStyles } from "./screenStyles";
import { LogOutIcon, MapPinIcon, MessageOffIcon } from "../../components/svg";
import { photos } from "../../utils/imgTraining"; //Local photos for training - delete after end of project

const {
  header,
  headerTitle,
  logoutBtn,
  mainScreenWrapper,
  avatar,
  avatarName,
  avatarEmail,
  imgWrapper,
  imgTitle,
  numberCommentsStyle,
  locationStyle,
} = screenStyles;

const PostsScreen = ({ route }) => {
  const {
    userData: { userName, email },
  } = route.params;
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("login");
  };

  return (
    <KeyboardWrapper>
      <View style={header}>
        <Text style={headerTitle}>Publications</Text>
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
          <View style={avatar}></View>
          <View>
            <Text style={avatarName}>{userName}</Text>
            <Text style={avatarEmail}>{email}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={imgWrapper}>
          {photos.map((photo) => {
            const { id, picture, title, numberComments, location } = photo;
            return (
              <View style={{ gap: 8 }} key={id}>
                <Image
                  style={{ width: 343, height: 240 }}
                  source={picture}
                ></Image>
                <Text style={imgTitle}>{title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MessageOffIcon />
                  <Text style={numberCommentsStyle}>{numberComments}</Text>
                  <MapPinIcon />
                  <Text style={locationStyle}>{location}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
};

export default PostsScreen;
