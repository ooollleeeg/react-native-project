import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import { authLogout } from "../../redux/auth/authOperations";
import { LogOutIcon } from "../svg";

const LogoutBtn = ({ from }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigation.navigate("login");
    dispatch(authLogout());
  };

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 16,
        top: from === "header" ? 28 : 22,
      }}
      activeOpacity={0.7}
      onPress={handleLogout}
    >
      <LogOutIcon />
    </TouchableOpacity>
  );
};

export default LogoutBtn;

LogoutBtn.propTypes = {
  from: PropTypes.string,
};
