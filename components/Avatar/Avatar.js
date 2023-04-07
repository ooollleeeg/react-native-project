import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";

import { avatarStyles } from "./avatarStyles";
import { AddAvatarIcon, RemoveAvatarIcon } from "../svg";

const { avatarBox, avatarStyle, addIcon, removeIcon } = avatarStyles;
const Avatar = ({ photoUri, fromScreen }) => {
  const [avatarUri, setAvatarUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (photoUri) {
      setAvatarUri(photoUri);
    }
  }, [photoUri]);

  // change avatarBox to real photo from Redux

  return (
    <>
      {!avatarUri && (
        <TouchableOpacity
          style={avatarBox}
          onPress={() => {
            navigation.navigate("camera", { fromScreen });
          }}
        >
          <AddAvatarIcon style={addIcon} />
        </TouchableOpacity>
      )}
      {avatarUri && (
        <TouchableOpacity onPress={() => setAvatarUri(null)}>
          <View style={avatarBox}>
            <Image style={avatarStyle} source={{ uri: avatarUri }} />
            <RemoveAvatarIcon style={removeIcon} />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

Avatar.propTypes = {
  photoUri: PropTypes.string,
  fromScreen: PropTypes.string.isRequired,
};

export default Avatar;
