import formatDateTime from 'src/Helpers/formatDateTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostImage from '../PostTypes/PostImage';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Avatar, Text, View} from 'react-native-ui-lib';
import {FeedModel, PostReactionRequest} from 'src/Models/Feed';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {setFeedData} from 'src/Store/Ducks/feedDuck';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

interface Props extends FeedModel {
  handleReaction: Function;
  handleDeletePost: Function;
}

const FeedCard: React.FC<Props> = props => {
  const {
    commentCount,
    content,
    dateCreated,
    downvoteCount,
    downvoted,
    gamerName,
    handleReaction,
    handleDeletePost,
    imageUrl,
    postId,
    tagName,
    type,
    upvoteCount,
    upvoted,
  } = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user} = useSelector((state: GamerAppReduxStore) => state);

  const {gamerId} = user.user;

  function handleDotsPress() {
    console.log('handleDotsPress');
  }

  function handleCommentsPress() {
    handleNavigatePost();
  }

  // ta pronto aqui, só chamar o delete.
  function handleDeletePostPress() {
    handleDeletePost(postId);
  }


  function handleDownvotePress() {
    const data: PostReactionRequest = {
      postId,
      gamerId,
      reaction: 0,
    };

    handleReaction(data);
  }

  function handleNavigatePost() {
    dispatch(
      setFeedData({
        selectedPost: {
          ...props,
        },
      }),
    );

    navigation.navigate('PostNavigation', {screen: 'PostDetails'});
  }

  function handleUpvotePress() {
    const data: PostReactionRequest = {
      postId,
      gamerId: '',
      reaction: 1,
    };
    handleReaction(data);
  }

  const contentParsed = JSON.parse(content);

  function renderContent() {
    switch (type) {
      case 'Imagem': {
        return <PostImage {...contentParsed} />;
      }

      default:
        return;
    }
  }

  return (
    <View style={styles.container}>
      <View centerV paddingH-10 paddingV-6 spread row>
        <View centerV row>
          <Avatar
            imageProps={{resizeMode: 'contain', source: {uri: imageUrl}}}
            imageSource={{uri: imageUrl}}
            size={40}
          />

          <View marginL-15>
            <View centerV row>
              <Text dark10>{gamerName}</Text>
            </View>

            <View>
              <Text dark40>{formatDateTime(dateCreated)}</Text>
            </View>
          </View>
        </View>

        <View centerV row>
          {tagName && (
            <View style={styles.tagContainer}>
              <Text style={styles.tag}>{tagName}</Text>
            </View>
          )}

          {/* <TouchableOpacity onPress={handleDotsPress}>
            <MaterialCommunityIcons
              name="dots-vertical"
              color="#191919"
              size={28}
            />
          </TouchableOpacity> */}
        </View>
      </View>

      <TouchableOpacity onPress={handleNavigatePost} paddingV-15>
        {renderContent()}
      </TouchableOpacity>

      <View centerV paddingH-12 paddingV-10 row spread style={styles.bottom}>
        <View centerV row>
          <TouchableOpacity
            onPress={handleUpvotePress}
            style={styles.iconContainer}>
            <SimpleLineIcons
              color={upvoted ? MyColors.primary : '#5c5c5c'}
              name="arrow-up-circle"
              size={26}
            />

            <Text
              marginL-7
              style={[styles.iconText, upvoted && styles.iconTextActive]}>
              {upvoteCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDownvotePress}
            style={[styles.iconContainer, styles.iconContainerMargin]}>
            <SimpleLineIcons
              color={downvoted ? MyColors.primary : '#5c5c5c'}
              name="arrow-down-circle"
              size={26}
            />

            <Text
              marginL-7
              style={[styles.iconText, downvoted && styles.iconTextActive]}>
              {downvoteCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCommentsPress}
            style={[styles.iconContainer, styles.iconContainerMargin]}>
            <MaterialCommunityIcons
              color="#5c5c5c"
              name="comment-text-outline"
              size={26}
            />

            <Text marginL-7 style={styles.iconText}>
              {commentCount}
            </Text>
          </TouchableOpacity>
        </View>

        <View centerV row>
          {/* <View marginR-8>
            <MaterialCommunityIcons
              color="#5c5c5c"
              name="bookmark-outline"
              size={30}
            />
          </View> */}

          {/* <SimpleLineIcons color="#5c5c5c" name="share" size={22} /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainerMargin: {
    marginLeft: 15,
  },
  iconText: {
    color: '#5c5c5c',
    fontSize: 19,
  },
  iconTextActive: {
    color: MyColors.primary,
  },
  tag: {
    fontSize: 12,
    color: '#242424',
  },
  tagContainer: {
    marginRight: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#edebeb',
  },
});

export default FeedCard;
