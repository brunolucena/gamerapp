import React, {useState} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import SideSwipe from 'react-native-sideswipe';

const {width} = Dimensions.get('window');

interface CarouselProps {
  component: any;
  data: any;
  itemWidth: number;
}

import {Container} from './styles';

const Carousel: React.SFC<CarouselProps> = props => {
  const {component, data, itemWidth} = props;

  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  const renderItem = ({item}) => {
    return (
      <Animated.View>{React.createElement(component, item)}</Animated.View>
    );
  };

  const contentOffset = (width - itemWidth) / 2;

  return (
    <Container>
      <SideSwipe
        contentOffset={contentOffset}
        data={data}
        index={currentStateIndex}
        itemWidth={itemWidth}
        style={styles.sideSwipe}
        onIndexChange={index => setCurrentStateIndex(index)}
        renderItem={renderItem}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  sideSwipe: {
    flex: 1,
    width,
  },
});

export default Carousel;
