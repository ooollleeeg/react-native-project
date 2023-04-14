import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { postItemStyles } from "./postItemStyles";
import {
  MapPinIcon,
  MessageOffIcon,
  MessageOnIcon,
  LikeOnIcon,
  LikeOffIcon,
} from "../svg";
import { changeLikes } from "../../redux/posts/postsOperations";

const { imgTitle, textStyle, locationStyle, infoWrapper } = postItemStyles;

const PostItem = ({ post, fromScreen }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    picture,
    title,
    descriptionLocation,
    latitude,
    longitude,
    likes,
    countComments,
    idPost,
  } = post.item;

  const handleLikes = () => {
    dispatch(changeLikes(idPost));
  };

  const handleMapScreen = () => {
    navigation.navigate("map", { latitude, longitude, fromScreen });
  };

  const handleCommentsScreen = () => {
    navigation.navigate("comments", { picture, idPost });
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
          {countComments ? <MessageOnIcon /> : <MessageOffIcon />}
          <Text
            style={{
              ...textStyle,
              color: countComments ? "#212121" : "#BDBDBD",
            }}
          >
            {countComments}
          </Text>
        </TouchableOpacity>
        {fromScreen === "profile" && (
          <TouchableOpacity style={infoWrapper} onPress={handleLikes}>
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
  post: PropTypes.object.isRequired,
  fromScreen: PropTypes.string,
};

export default PostItem;
