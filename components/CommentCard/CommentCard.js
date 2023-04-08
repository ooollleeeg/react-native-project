import PropTypes from "prop-types";
import { format } from "date-fns";
import { Image, View, Text } from "react-native";

import { commentStyles } from "./commentStyles";

const { commentWrapper, commentDate, commentText, icon } = commentStyles;

const CommentCard = ({ comment }) => {
  const isCommentEven = comment.index % 2 === 0;
  const { textComment, dateComment } = comment.item;

  return (
    <View
      style={{
        paddingLeft: isCommentEven ? 44 : 0,
        paddingRight: isCommentEven ? 0 : 44,
        marginTop: 24,
      }}
    >
      <Image
        style={{
          ...icon,
          alignSelf: isCommentEven ? "flex-start" : "flex-end",
        }}
        source={require("../../assets/images/commentator.jpg")}
      ></Image>
      <View
        style={{
          ...commentWrapper,
          borderTopRightRadius: isCommentEven ? 8 : 0,
          borderTopLeftRadius: isCommentEven ? 0 : 8,
        }}
      >
        <Text style={commentText}>{textComment}</Text>
        <Text
          style={{
            ...commentDate,
            alignSelf: isCommentEven ? "flex-end" : "flex-start",
          }}
        >
          {format(dateComment, "PPpp")}
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
};
