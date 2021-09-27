import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'src/Components/Button';
import MyTextField from 'src/Components/TextField';
import React, { useEffect, useState } from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TopNavigationBar from 'src/Components/TopNavigationBar';
import { Avatar, Text, View } from 'react-native-ui-lib';
import { Comment } from 'src/Models/Comment';
import { CommentCard } from '../PostDetails';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { GamerAppReduxStore } from 'src/Store';
import { loadCommentReplies, sendCommentReply } from 'src/Store/Ducks/postCommentReplyDuck';
import { MyColors } from 'src/Theme/FoundationConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  commentReaction,
  loadComments,
  selectPostCommentHasNextPage,
} from 'src/Store/Ducks/postCommentDuck';

const paper = require('../../../Assets/images/paper.png');

const PostCommentDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    feed,
    postComment,
    postCommentReplies: postCommentRepliesRedux,
    user,
  } = useSelector((state: GamerAppReduxStore) => state);
  const [inputMessage, setInputMessage] = useState('');

  const {selectedPost} = feed;
  const {activeComment} = postComment;
  const {comments} = postCommentRepliesRedux;
  const {gamerId} = user.user;

  function handleSend() {
    if (inputMessage.length > 0) {
      dispatch(
        sendCommentReply({
          comment: inputMessage,
          gamerId,
          postId: selectedPost.postId,
          replyId: activeComment.postCommentId,
        },
        `${user.user.firstName} ${user.user.lastName}`,
        user.user.imageUrl ?? ''
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
          page: 1,
          postId: selectedPost.postId,
          searchText: '',
        }),
      );
    }
  }

  function renderItem({item}: {item: Comment}) {
    const {
      comment,
      downvoteCount,
      downvoted,
      gamerName,
      imageUrl,
      postCommentId,
      upvoteCount,
      upvoted,
    } = item;

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

    function handleOnPress() {
      navigation.navigate('PostCommentDetails');
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
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleOnPress}
        style={styles.commentContainer}>
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

          <Text dark20 marginH-10>{comment}</Text>

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

                <Text marginL-7 style={styles.iconText}>
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

                <Text marginL-7 style={styles.iconText}>
                  {downvoteCount}
                </Text>
              </TouchableOpacity>
            </View>

            <View centerV row>
              {/* <SimpleLineIcons color="#5c5c5c" name="share" size={22} /> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    dispatch(
      loadCommentReplies({
        gamerId,
        page: 1,
        postCommentId: activeComment.postCommentId,
        searchText: '',
      }),
    );
  }, [dispatch]);

  const header = <View marginB-5><CommentCard {...activeComment} /></View>;

  return (
    <View flex>
      <TopNavigationBar title="Post Comentário" />

      <FlatList
        ListHeaderComponent={header}
        data={comments}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
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

export default PostCommentDetails;
