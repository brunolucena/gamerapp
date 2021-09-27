import React, {useEffect} from 'react';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Image, ImageProps} from 'react-native-ui-lib';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {setTutorialDone} from 'src/Store/Ducks/user';

import {logEvent, trackScreenView} from '../../Analytics/analyticsFunctions';
import {useNavigation} from '@react-navigation/native';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';

interface TutorialStep {
  imageProps: ImageProps;
  text: string;
  title: string;
}

const {width} = Dimensions.get('window');

const tutorialSteps: TutorialStep[] = [
  {
    imageProps: {
      source: require('../../Assets/images/tutorial/tutorial1.png'),
    },
    text: 'Crie sua coleção, troque seus jogos com outros gamers e muito mais!',
    title: 'Troque ou venda',
  },
  {
    imageProps: {
      source: require('../../Assets/images/tutorial/tutorial2.png'),
    },
    text:
      'Se destaque no Gamer Ranking, tenha condições especiais e seja respeitado.',
    title: 'Acumule pontos',
  },
  {
    imageProps: {
      source: require('../../Assets/images/tutorial/tutorial3.png'),
    },
    text:
      'Você está entrando na maior rede de gamers do Brasil, seja bem vindo(a)!',
    title: 'Faça parte',
  },
];

function _renderItem({item, index}: {item: TutorialStep; index: number}) {
  return (
    <View style={styles.itemContainer} key={`${item.title} - ${index}`}>
      <Image {...item.imageProps} />
      <Text style={[styles.text, styles.big]}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

const Tutorial = () => {
  const [page, setPage] = useState(0);
  const carouselRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    logEvent('tutorial_begin');
    trackScreenView('Tutorial 1');
  }, []);

  function onPress() {
    logEvent('tutorial_complete');
    dispatch(setTutorialDone(true));
    navigation.navigate('Login');
  }

  function pagination() {
    return (
      <Pagination
        activeDotIndex={page}
        carouselRef={carouselRef.current!}
        containerStyle={styles.paginationContainer}
        dotColor={MyColors.primary}
        dotStyle={styles.dotStyle}
        dotsLength={tutorialSteps.length}
        inactiveDotColor="#38bf00"
        inactiveDotOpacity={0.3}
        inactiveDotScale={1}
        tappableDots={!!carouselRef.current}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          contentContainerCustomStyle={styles.carouselContainer}
          data={tutorialSteps}
          itemWidth={width}
          onSnapToItem={index => {
            trackScreenView(`Tutorial ${index + 1}`);
            setPage(index);
          }}
          ref={carouselRef}
          renderItem={_renderItem}
          sliderWidth={width}
        />
      </View>

      <View style={styles.bottom}>
        {pagination()}

        <MyButton
          style={styles.buttonStyle}
          onPress={onPress}
          label="Começar"
          type="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  big: {
    color: '#292929',
    fontSize: 30,
  },
  bottom: {
    flex: 1,
    marginBottom: 10,
  },
  buttonStyle: {
    margin: 50,
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselWrapper: {
    flex: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    color: '#2699fb',
  },
  dotStyle: {
    width: 9,
    height: 9,
    borderRadius: 9,
  },
  itemContainer: {
    alignItems: 'center',
  },
  paginationContainer: {
    justifyContent: 'center',
    marginBottom: 30,
  },
  text: {
    margin: 10,
    color: '#9b9b9b',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Tutorial;
