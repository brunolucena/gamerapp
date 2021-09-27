import React, {useRef} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import {Banner} from '../../../Models/Dashboard';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = screenWidth - 50;

export const carouselHeight = 113;

interface Props {
  banners: Banner[];
}

const HomeCarousel = ({banners}: Props) => {
  const carouselRef = useRef(null);

  const _renderItem = ({item}: {item: Banner}, parallaxProps: object) => {
    const {imageUrl, link, name} = item;

    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: imageUrl}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={banners}
        hasParallaxImages
        itemWidth={itemWidth}
        ref={carouselRef}
        renderItem={_renderItem}
        sliderHeight={carouselHeight}
        sliderWidth={screenWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    height: carouselHeight,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});

export default HomeCarousel;
