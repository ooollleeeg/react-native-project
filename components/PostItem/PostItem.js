import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { postItemStyles } from "./postItemStyles";
import { MapPinIcon, MessageOffIcon, MessageOnIcon } from "../svg";

const { imgTitle, numberCommentsStyle, locationStyle, infoWrapper } =
  postItemStyles;

const PostItem = ({ photo }) => {
  const { picture, title, comments, location } = photo;
  const numberComments = comments.length;

  return (
    <>
      <Image style={{ width: 343, height: 240 }} source={picture}></Image>
      <Text style={imgTitle}>{title}</Text>
      <View style={infoWrapper}>
        <TouchableOpacity style={infoWrapper}>
          {numberComments ? <MessageOnIcon /> : <MessageOffIcon />}
          <Text style={numberCommentsStyle}>{numberComments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={infoWrapper}>
          <MapPinIcon />
          <Text style={locationStyle}>{location}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

PostItem.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PostItem;
