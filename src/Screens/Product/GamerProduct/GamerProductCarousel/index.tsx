import React, {useRef} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = screenWidth - 50;
const itemHeight = 113;

interface Props {
  images: ImageSourcePropType[];
}

const GamerProductCarousel = ({images}: Props) => {
  const carouselRef = useRef(null);

  const _renderItem = (
    {item, index}: {item: ImageSourcePropType; index: number},
    parallaxProps: object,
  ) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          key={index}
          source={item}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={itemHeight}
        itemWidth={itemWidth}
        loop
        data={images}
        renderItem={_renderItem}
        hasParallaxImages
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: itemWidth,
    height: itemHeight,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: '#EAE9E4',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  wrapper: {
    backgroundColor: '#ffffff',
  },
});

export default GamerProductCarousel;
