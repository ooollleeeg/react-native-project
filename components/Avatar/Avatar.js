import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../components/utils/globalStyles";
import { AddAvatarIcon, RemoveAvatarIcon } from "../svg";

const Avatar = ({ isAvatar = false }) => {
  return (
    <View style={globalStyles.avatarBox}>
      <TouchableOpacity>
        {isAvatar ? (
          <RemoveAvatarIcon style={{ marginTop: 75, marginLeft: 101 }} />
        ) : (
          <AddAvatarIcon style={{ marginTop: 81, marginLeft: 107 }} />
        )}
      </TouchableOpacity>
    </View>
  );
};

Avatar.propTypes = {
  isAvatar: PropTypes.bool,
};

export default Avatar;
