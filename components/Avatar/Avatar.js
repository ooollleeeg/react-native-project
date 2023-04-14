import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";
import { ref, deleteObject } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";

import { avatarStyles } from "./avatarStyles";
import { AddAvatarIcon, RemoveAvatarIcon } from "../svg";
import { selectAvatar } from "../../redux/auth/authSelectors";
import { storage } from "../../firebase/config";
import { changeAvatar } from "../../redux/auth/authOperations";
import { successDeleteAvatarToast } from "../../components/utils/toasts";

const { avatarBox, avatarStyle, addIcon, removeIcon } = avatarStyles;

const Avatar = ({ fromScreen }) => {
  const [avatarUri, setAvatarUri] = useState(null);
  const avatarURL = useSelector(selectAvatar);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (avatarURL) {
      setAvatarUri(avatarURL);
    }
  }, [avatarURL]);

  const removeAvatar = async () => {
    const avatarRef = ref(storage, avatarURL);
    await deleteObject(avatarRef)
      .then(() => {
        dispatch(changeAvatar(""));
        setAvatarUri(null);
        successDeleteAvatarToast();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
        <TouchableOpacity onPress={removeAvatar}>
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
