import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SafeAreaView, View, Text, Image, FlatList } from "react-native";

import { successLoginToast } from "../../components/utils/toasts";
import { screenStyles } from "./screenStyles";

import PostItem from "../../components/PostItem/PostItem";
import Header from "../../components/Header/Header";
import { selectUser } from "../../redux/auth/authSelectors";
import { selectPosts } from "../../redux/posts/postsSelectors";
import { getPosts } from "../../redux/posts/postsOperations";

const { mainScreenWrapper, avatarImg, avatarName, avatarEmail } = screenStyles;

const PostsScreen = () => {
  const { userName, userEmail, avatar } = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => successLoginToast(), []);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ marginBottom: 200 }}>
      <Header title="Posts" />
      <View style={mainScreenWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={avatarImg} source={{ uri: avatar ? avatar : null }} />
          <View>
            <Text style={avatarName}>{userName}</Text>
            <Text style={avatarEmail}>{userEmail}</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={posts}
        keyExtractor={(post) => post.idPost}
        renderItem={(post) => (
          <View style={{ marginBottom: 32 }}>
            <PostItem post={post} fromScreen="posts" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PostsScreen;
