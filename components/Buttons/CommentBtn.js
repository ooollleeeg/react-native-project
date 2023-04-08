import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";

import { btnStyles } from "./btnStyles";
import { SendIcon } from "../svg";

const CommentBtn = ({ onSubmit, isActive = false }) => {
  const { mainBtn, mainBtnTitle } = btnStyles;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? "#FF6C00" : "#F6F6F6",
      }}
      activeOpacity={0.7}
      disabled={isActive ? false : true}
      onPress={onSubmit}
    >
      <SendIcon />
    </TouchableOpacity>
  );
};

export default CommentBtn;

CommentBtn.propTypes = {
  onSubmit: PropTypes.func,
  isActive: PropTypes.bool,
};
