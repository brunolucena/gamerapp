import FeedCard from 'src/Screens/Feed/FeedCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/Components/Button';
import MyTextField from 'src/Components/TextField';
import React, {useCallback, useEffect, useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TopNavigationBar from 'src/Components/TopNavigationBar';
import {Avatar, Text, View} from 'react-native-ui-lib';
import {Comment} from 'src/Models/Comment';
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {postReaction} from 'src/Store/Ducks/feedDuck';
import {PostReactionRequest} from 'src/Models/Feed';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  commentReaction,
  loadComments,
  selectPostCommentHasNextPage,
  sendComment,
  setPostCommentDuckData,
} from 'src/Store/Ducks/postCommentDuck';

const paper = require('../../../Assets/images/paper.png');

export const CommentCard: React.FC<Comment> = (props) => {
  const {
    comment,
    downvoteCount,
    downvoted,
    gamerName,
    imageUrl,
    postCommentId,
    repliesCount,
    upvoteCount,
    upvoted,
  } = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user} = useSelector((state: GamerAppReduxStore) => state);

  const {gamerId} = user.user;

  function handleCommentsPress() {
    console.log('oi')
    dispatch(
      setPostCommentDuckData({
        activeComment: {
          ...props,
        },
      }),
    );

    navigation.navigate('PostNavigation', {screen: 'PostCommentDetails'});
  }

  function handleDotsPress() {
    console.log('handleDotsPress');
  }

  function handleDownvotePress() {
    dispatch(
      commentReaction({
        gamerId,
        postCommentId,
        reaction: 0,
      }),
    );
  }

  function handleUpvotePress() {
    dispatch(
      commentReaction({
        gamerId,
        postCommentId,
        reaction: 1,
      }),
    );
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
          </View>
        </View>

        <View centerV row>
          {/* <TouchableOpacity onPress={handleDotsPress}>
            <MaterialCommunityIcons
              name="dots-vertical"
              color="#191919"
              size={28}
            />
          </TouchableOpacity> */}
        </View>
      </View>

      <Text dark20 marginH-10>
        {comment}
      </Text>

      <View
        centerV
        marginT-10
        paddingH-12
        paddingV-10
        row
        spread
        style={styles.bottom}>
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
              color='#5c5c5c'
              name="comment-text-outline"
              size={26}
            />

            <Text
              marginL-7
              style={[styles.iconText, downvoted && styles.iconTextActive]}>
              {repliesCount}
            </Text>
          </TouchableOpacity>
        </View>

        <View centerV row>
          {/* <SimpleLineIcons color="#5c5c5c" name="share" size={22} /> */}
        </View>
      </View>
    </View>
  );
};

const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {feed, postComment, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );
  const [inputMessage, setInputMessage] = useState('');

  const {selectedPost} = feed;
  const {comments, page, refreshing} = postComment;
  const {gamerId} = user.user;

  function handlePostReaction(data: PostReactionRequest) {
    dispatch(
      postReaction({
        ...data,
        gamerId,
      }),
    );
  }

  function handleSend() {
    if (inputMessage.length > 0) {
      dispatch(
        sendComment(
          {
            gamerId,
            postId: selectedPost.postId,
            comment: inputMessage,
          },
          `${user.user.firstName} ${user.user.lastName}`,
          user.user.imageUrl ?? '',
        ),
      );

      setInputMessage('');
    }
  }

  function keyExtractor(item: Comment, index: number) {
    return `${item.postCommentId} - ${index}`;
  }

  function onEndReached() {
    const hasNextPage = selectPostCommentHasNextPage(postComment);

    if (hasNextPage) {
      dispatch(
        loadComments({
          gamerId,
          page: page + 1,
          postId: selectedPost.postId,
          searchText: '',
        }),
      );
    }
  }

  function renderItem({item}: {item: Comment}) {
    function handleOnPress() {
      navigation.navigate('PostCommentDetails');

      dispatch(
        setPostCommentDuckData({
          activeComment: item,
        }),
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleOnPress}
        style={styles.commentContainer}>
        <CommentCard {...item} />
      </TouchableOpacity>
    );
  }

  const empty = (
    <View center padding-20>
      <Text dark30>Seja o primeiro a comentar!</Text>
    </View>
  );

  useEffect(() => {
    dispatch(
      loadComments({
        gamerId,
        page,
        postId: selectedPost.postId,
        searchText: '',
      }),
    );
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(
      setPostCommentDuckData({
        refreshing: true,
      }),
    );

    dispatch(
      loadComments({
        gamerId,
        page,
        postId: selectedPost.postId,
        searchText: '',
      }),
    );
  }, [dispatch, gamerId]);

  const header = (
    <View>
      <FeedCard {...selectedPost} handleReaction={handlePostReaction} />

      <Text color={MyColors.secondary} margin-10>
        COMENTÁRIOS
      </Text>
    </View>
  );

  return (
    <View flex>
      <TopNavigationBar title="Post" />

      <FlatList
        ListEmptyComponent={empty}
        ListHeaderComponent={header}
        data={comments}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
      />

      <View style={styles.inputWrapper}>
        <MyTextField
          containerStyle={styles.inputContainer}
          style={styles.input}
          handleChangeText={setInputMessage}
          title=""
          placeholder="Escreva um comentário"
          returnKeyType="send"
          value={inputMessage}
          hideUnderline
        />

        <MyButton
          iconSource={paper}
          iconStyle={styles.icon}
          onPress={handleSend}
          round
          label=""
          style={styles.buttonIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  buttonIcon: {
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  commentContainer: {
    marginBottom: 5,
    marginHorizontal: 6,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  icon: {
    height: 15,
    width: 15,
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
  input: {
    top: 8,
    left: 14,
  },
  inputContainer: {
    flex: 1,
    height: 40,
    paddingRight: 27,
    backgroundColor: '#ffffffff',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#eaeaea',
    borderTopWidth: 1,
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

export default PostDetails;
