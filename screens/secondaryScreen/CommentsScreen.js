import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";

import { secondaryScreensStyles } from "./secondaryScreensStyles";
import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import Header from "../../components/Header/Header";
import CommentCard from "../../components/CommentCard/CommentCard";
import { SendIcon } from "../../components/svg";
import { toastConfig, errorCommentsToast } from "../../components/utils/toasts";

const { commentWrapper, commentIcon, inputStyle } = secondaryScreensStyles;

const CommentsScreen = ({ route }) => {
  const [pictureUri, setPictureUri] = useState(null);
  const [text, setChangeText] = useState(null);
  const [comments, setComments] = useState([]);
  const [isActiveInput, setIsActiveInput] = useState(false);

  useEffect(() => {
    setPictureUri(route.params?.picture);
  }, [route.params]);

  const handleComment = () => {
    if (!text || text.length < 10 || text.length > 200) {
      errorCommentsToast();
      return;
    }
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        textComment: text.trim(),
        dateComment: Date.now(),
      },
    ]);
    setChangeText("");
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardWrapper>
        <Header title="Comments" />
        <View style={commentWrapper}>
          <Image style={commentIcon} source={{ uri: pictureUri }} />
          <FlatList
            style={{ marginTop: 8 }}
            data={comments}
            keyExtractor={(comment) => comment.id}
            renderItem={(comment) => <CommentCard comment={comment} />}
          />
          <View style={{ paddingVertical: 16, justifyContent: "center" }}>
            <TextInput
              style={{
                ...inputStyle,
                borderColor: isActiveInput ? "#FF6C00" : "#E8E8E8",
              }}
              keyboardType="default"
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
              value={text}
              onFocus={() => setIsActiveInput(true)}
              onEndEditing={() => setIsActiveInput(false)}
              onChangeText={setChangeText}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 8 }}
              onPress={handleComment}
            >
              <SendIcon />
            </TouchableOpacity>
          </View>
        </View>
        <Toast position="top" topOffset={60} config={toastConfig} />
      </KeyboardWrapper>
    </>
  );
};

export default CommentsScreen;
