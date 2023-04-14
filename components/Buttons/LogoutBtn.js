import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";

import { authLogout } from "../../redux/auth/authOperations";
import { LogOutIcon } from "../svg";

const LogoutBtn = ({ from }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 16,
        top: from === "header" ? 28 : 22,
      }}
      activeOpacity={0.7}
      onPress={() => dispatch(authLogout())}
    >
      <LogOutIcon />
    </TouchableOpacity>
  );
};

export default LogoutBtn;

LogoutBtn.propTypes = {
  from: PropTypes.string,
};
