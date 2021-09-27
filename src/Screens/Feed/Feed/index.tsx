import appConfig from '../../../../app.json';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import FeedCard from '../FeedCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import NotifService, {onRegisterToken} from 'src/Services/NotifService';
import React, {useCallback, useEffect, useState} from 'react';
import Tags from '../Tags';
import TopBar from '../TopBar';
import {FeedModel, PostReactionRequest} from 'src/Models/Feed';
import {deletePost, filterPosts, postReaction, setFeedData} from 'src/Store/Ducks/feedDuck';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {PostType} from 'src/Store/Ducks/postDuck/models';
import {PushNotification} from 'react-native-push-notification';
import {setDeviceToken} from 'src/Store/Ducks/gamer';
import {setPostDuckData} from 'src/Store/Ducks/postDuck';
import {Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {handleNotification} from 'src/Store/Ducks/notificationDuck';
import {onSignIn} from 'src/Analytics/analyticsFunctions';
import {setAnalyticsUserSet} from 'src/Store/Ducks/user';

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {feed, gamer, post, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );
  const [modalOpened, setModalOpened] = useState(false);

  const {count, loading, page, posts, refreshing, selectedTags} = feed;
  const {deviceToken} = gamer;
  const {analyticsIsUserSet} = user;
  const {email, firstName, gamerId, lastName} = user.user;

  const notif = new NotifService(onRegister, onNotif, appConfig.senderID);

  function onRegister({token}: onRegisterToken) {
    if (deviceToken !== token) {
      dispatch(
        setDeviceToken({
          gamerId,
          token,
        }),
      );
    }
  }

  function onNotif(notification: PushNotification) {
    // @ts-ignore
    const {foreground, type, userInteraction} = notification;

    // @ts-ignore
    const payload = notification.payload
      ? // @ts-ignore
        JSON.parse(notification.payload)
      : {};

    if (userInteraction || !foreground) {
      try {
        dispatch(handleNotification(payload, type, gamerId));
      } catch {}
    }
  }

  // Verificações do analytics
  useEffect(() => {
    setTimeout(function() {
      if (!analyticsIsUserSet) {
        onSignIn(gamerId, `${firstName} ${lastName}`, email);
        dispatch(setAnalyticsUserSet(true));
      }
    }, 1000);
  }, [analyticsIsUserSet, dispatch, email, firstName, gamerId, lastName]);

  function handleNavigateNewPost(newPostType: PostType) {
    toggleModal();

    navigation.navigate('PostNavigation', {screen: 'NewPost'});

    dispatch(setPostDuckData({newPostType}));
  }

  function handleNewPostWithImage() {
    handleNavigateNewPost('Image');
  }

  function handleNewPostWithLink() {
    handleNavigateNewPost('Link');
  }

  function handleNewQuestion() {
    handleNavigateNewPost('Question');
  }

  function handleNewReview() {
    handleNavigateNewPost('Review');
  }

  function toggleModal() {
    setModalOpened(!modalOpened);
  }

  function handleDispatchDeletePost(postId: string) {
    dispatch(deletePost({
      postId
    }));
  }

  function handlePostReaction(data: PostReactionRequest) {
    dispatch(
      postReaction({
        ...data,
        gamerId,
      }),
    );
  }

  function keyExtractor(item: FeedModel, index: number): string {
    return `${item.postId} - ${index}`;
  }

  function renderItem({item}: {item: FeedModel}) {
    return (
      <View marginB-15>
        <FeedCard {...item} handleReaction={handlePostReaction} handleDeletePost={handleDispatchDeletePost} />
      </View>
    );
  }

  const empty = (
    <View center padding-50>
      <Text center dark20>
        Seja o primeiro a fazer uma postagem no seu feed!
      </Text>
    </View>
  );

  const header = (
    <>
      <TopBar />
      <Tags />
    </>
  );

  const footer = (
    <View center marginB-50 marginT-30 padding-20>
      {loading ? (
        <CustomActivityIndicator isVisible={loading} />
      ) : (
        <Text center dark20>
          {posts.length >= count && 'Fim do feed'}
        </Text>
      )}
    </View>
  );

  const nextPage = () => {
    const hasNextPage = posts.length < count;

    if (hasNextPage) {
      dispatch(
        filterPosts({
          page: page + 1,
          searchText: '',
          tagIds: selectedTags.map(selectedTag => selectedTag.id),
          gamerId,
        }),
      );
    }
  };

  const onRefresh = useCallback(() => {
    dispatch(
      setFeedData({
        refreshing: true,
      }),
    );

    dispatch(
      filterPosts({
        page: 1,
        searchText: '',
        tagIds: selectedTags.map(selectedTag => selectedTag.id),
        gamerId,
      }),
    );
  }, [dispatch, gamerId]);

  useEffect(() => {
    dispatch(
      filterPosts({
        page: 1,
        searchText: '',
        tagIds: selectedTags.map(selectedTag => selectedTag.id),
        gamerId,
      }),
    );
  }, [post.postCreated, selectedTags]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={toggleModal} style={styles.buttonContainer}>
        <MaterialCommunityIcons
          color="#ffffff"
          name="plus-circle-outline"
          size={28}
        />

        <Text marginL-10 style={styles.buttonText} white>
          Novo
        </Text>
      </TouchableOpacity>

      <View>
        <FlatList
          ListEmptyComponent={empty}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ListFooterComponentStyle={styles.footer}
          data={posts}
          keyExtractor={keyExtractor}
          onEndReached={nextPage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={renderItem}
        />
      </View>

      <Modal
        isVisible={modalOpened}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          {/* <TouchableOpacity
            onPress={handleNewReview}
            style={styles.modalItemContainer}>
            <View paddingL-3 style={styles.iconWrapper}>
              <Foundation
                color={MyColors.warn}
                name="clipboard-pencil"
                size={30}
              />
            </View>

            <Text color={MyColors.warn} style={styles.modalItemText}>
              Fazer um Review
            </Text>

            <Text style={styles.modalItemTextSmall}>+500 pontos</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={handleNewPostWithImage}
            style={[
              styles.modalItemContainer,
              styles.modalItemContainerNotFirstChild,
            ]}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                color={MyColors.secondary}
                name="image-size-select-actual"
                size={30}
              />
            </View>

            <Text color={MyColors.secondary} style={styles.modalItemText}>
              Post com Imagem
            </Text>

            {/* <Text style={styles.modalItemTextSmall}>+50 pontos</Text> */}
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={handleNewPostWithLink}
            style={[
              styles.modalItemContainer,
              styles.modalItemContainerNotFirstChild,
            ]}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                color={MyColors.primary}
                name="link-variant"
                size={30}
              />
            </View>

            <Text color={MyColors.primary} style={styles.modalItemText}>
              Post com Link
            </Text>

            <Text style={styles.modalItemTextSmall}>+50 pontos</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={handleNewQuestion}
            style={[
              styles.modalItemContainer,
              styles.modalItemContainerNotFirstChild,
            ]}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                color={MyColors.gray2}
                name="comment-question"
                size={30}
              />
            </View>

            <Text color={MyColors.gray2} style={styles.modalItemText}>
              Pergunta
            </Text>

            <Text style={styles.modalItemTextSmall}>+50 pontos</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: MyColors.primary,
    zIndex: 99,
  },
  buttonText: {
    fontSize: 18,
  },
  footer: {
    paddingBottom: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    width: 29,
  },
  modalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#ffffff',
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalItemContainerNotFirstChild: {
    marginTop: 20,
  },
  modalItemText: {
    marginLeft: 15,
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalItemTextSmall: {
    marginLeft: 7,
    color: '#5a5a5a',
    fontSize: 12,
  },
  modalWrapper: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  safeArea: {
    flex: 1,
  },
});

export default Feed;
