import React, {useState} from 'react';
import {Dimensions, Image} from 'react-native';
import {FeedVideoImageModel} from 'src/Models/Feed';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

const {width: screenWidth} = Dimensions.get('screen');

interface Props extends FeedVideoImageModel {}

const PostImage = (props: Props) => {
  const {Title: title, Url: url} = props;

  const [dimensions, setDimensions] = useState({height: 0, width: 0});

  Image.getSize(
    url,
    (width, height) => {
      const proportion = height / width;

      setDimensions({
        height: proportion * screenWidth,
        width: screenWidth,
      });
    },
    error => {
      console.log({url, error});
    },
  );

  return (
    <View>
      <Text marginH-20 style={styles.title}>
        {title}
      </Text>

      <View marginT-10>
        <Image
          height={dimensions.height}
          resizeMode="contain"
          source={{uri: url}}
          width={dimensions.width}
          style={{
            height: dimensions.height,
            width: dimensions.width,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#242424',
    fontSize: 16,
  },
});

export default PostImage;
