import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../mainScreens/PostsScreens";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "../mainScreens/ProfileScreen";
import { screenStyles } from "../mainScreens/screenStyles";
import { UserIcon, GridIcon, PlusIcon } from "../../components/svg";

export const MainTab = createBottomTabNavigator();

const Home = ({ route }) => {
  const { userName, email, photoUri } = route.params; //Local for training - delete after end of project
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: screenStyles.tabMenu,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        initialParams={{ userName, email, photoUri }} //Local for training - delete after end of project
        options={{
          tabBarIcon: ({ focused }) => <GridIcon focused={focused} />,
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => <PlusIcon focused={focused} />,
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userName, email, photoUri }} //Local for training - delete after end of project
        options={{
          tabBarIcon: ({ focused }) => <UserIcon focused={focused} />,
          tabBarStyle: { display: "none" },
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
