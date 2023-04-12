import PropTypes from "prop-types";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { postItemStyles } from "./postItemStyles";
import {
  MapPinIcon,
  MessageOffIcon,
  MessageOnIcon,
  LikeOnIcon,
  LikeOffIcon,
} from "../svg";

const { imgTitle, textStyle, locationStyle, infoWrapper } = postItemStyles;

const PostItem = ({ photo, fromScreen }) => {
  const [likes, setLikes] = useState(0);

  const navigation = useNavigation();
  const { picture, title, descriptionLocation, latitude, longitude, comments } =
    photo.item;
  const numberComments = comments.length;

  const handleMapScreen = () => {
    navigation.navigate("map", { latitude, longitude, fromScreen });
  };

  const handleCommentsScreen = () => {
    navigation.navigate("comments", { picture });
  };

  return (
    <>
      <Image
        style={{ width: "100%", height: 240, borderRadius: 8 }}
        source={{ uri: picture }}
      />
      <Text style={imgTitle}>{title}</Text>
      <View style={infoWrapper}>
        <TouchableOpacity style={infoWrapper} onPress={handleCommentsScreen}>
          {numberComments ? <MessageOnIcon /> : <MessageOffIcon />}
          <Text
            style={{
              ...textStyle,
              color: numberComments ? "#212121" : "#BDBDBD",
            }}
          >
            {numberComments}
          </Text>
        </TouchableOpacity>
        {fromScreen === "profile" && (
          <TouchableOpacity
            style={infoWrapper}
            onPress={() => setLikes(likes + 1)}
          >
            {likes ? <LikeOnIcon /> : <LikeOffIcon />}
            <Text
              style={{
                ...textStyle,
                color: likes ? "#212121" : "#BDBDBD",
              }}
            >
              {likes}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={infoWrapper} onPress={handleMapScreen}>
          <MapPinIcon />
          <Text style={locationStyle}>{descriptionLocation}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

PostItem.propTypes = {
  photo: PropTypes.object.isRequired,
  fromScreen: PropTypes.string,
};

export default PostItem;
