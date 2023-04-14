import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { secondaryScreensStyles } from "./secondaryScreensStyles";
import KeyboardWrapper from "../../components/KeyboardWrapper/KeyboardWrapper";
import Header from "../../components/Header/Header";
import CommentCard from "../../components/CommentCard/CommentCard";
import { SendIcon } from "../../components/svg";
import { errorCommentsToast } from "../../components/utils/toasts";
import {
  uploadComments,
  getCommentsByPostId,
} from "../../redux/posts/postsOperations";
import { selectComments } from "../../redux/posts/postsSelectors";

const { commentWrapper, commentIcon, inputStyle } = secondaryScreensStyles;

const CommentsScreen = ({ route }) => {
  const [text, setChangeText] = useState(null);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  const { idPost, picture } = route.params;

  useEffect(() => {
    dispatch(getCommentsByPostId(idPost));
  }, [dispatch]);

  const handleComment = () => {
    if (!text || text.length < 10 || text.length > 200) {
      errorCommentsToast();
      return;
    }

    const newComment = {
      idComment: Date.now().toString(),
      textComment: text.trim(),
      dateComment: Date.now(),
      idPost,
    };

    dispatch(uploadComments(newComment));
    dispatch(getCommentsByPostId(idPost));

    setChangeText("");
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardWrapper>
        <Header title="Comments" />
        <View style={commentWrapper}>
          <Image style={commentIcon} source={{ uri: picture }} />
          <FlatList
            style={{ marginTop: 8 }}
            data={comments}
            keyExtractor={(comment) => comment.idComment}
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
      </KeyboardWrapper>
    </>
  );
};

export default CommentsScreen;
