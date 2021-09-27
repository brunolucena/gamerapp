import AddKeywords from './NewPost/AddKeywords';
import AddTags from './NewPost/AddTags';
import NewPost from './NewPost';
import PostCommentDetails from './PostCommentDetails';
import PostDetails from './PostDetails';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type PostStackParamList = {
  AddKeywords: undefined;
  AddTags: undefined;
  NewPost: undefined;
  PostCommentDetails: undefined;
  PostDetails: undefined;
};

const Stack = createStackNavigator<PostStackParamList>();

function PostNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="NewPost"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="AddKeywords"
        component={AddKeywords}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddTags"
        component={AddTags}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostCommentDetails"
        component={PostCommentDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default PostNavigation;
