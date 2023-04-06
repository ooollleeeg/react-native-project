import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { globalStyles } from "../../components/utils/globalStyles";
import { UserIcon, GridIcon, PlusIcon } from "../../components/svg";

const MainTab = createBottomTabNavigator();

const Home = ({ route }) => {
  const userData = route.params; //Local for training - delete after end of project
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: globalStyles.tabMenu,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        initialParams={{ userData: userData }} //Local for training - delete after end of project
        options={{
          tabBarIcon: ({ focused }) => <GridIcon focused={focused} />,
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused }) => <PlusIcon focused={focused} />,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <UserIcon focused={focused} />,
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
