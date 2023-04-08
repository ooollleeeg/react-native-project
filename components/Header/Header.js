import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import { headerStyles } from "./headerStyles";
import { ArrowLeftIcon } from "../svg";
import { LogoutBtn } from "../Buttons";

const { header, goBackBtn, headerTitle } = headerStyles;

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={header}>
      {title !== "Posts" && (
        <TouchableOpacity
          style={goBackBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Posts")}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
      )}
      {title === "Posts" && <LogoutBtn from="header" />}
      <Text style={headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;
