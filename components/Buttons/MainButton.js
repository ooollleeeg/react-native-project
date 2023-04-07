import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import { btnStyles } from "./btnStyles";

export const MainButton = ({ onSubmitForm, title, isActive = false }) => {
  const { mainBtn, mainBtnTitle } = btnStyles;

  return (
    <TouchableOpacity
      style={{
        ...mainBtn,
        backgroundColor: isActive ? "#FF6C00" : "#F6F6F6",
      }}
      activeOpacity={0.7}
      disabled={isActive ? false : true}
      onPress={onSubmitForm}
    >
      <Text
        style={{
          ...mainBtnTitle,
          color: isActive ? "#fff" : "#BDBDBD",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

MainButton.propTypes = {
  onSubmitForm: PropTypes.func,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default MainButton;
