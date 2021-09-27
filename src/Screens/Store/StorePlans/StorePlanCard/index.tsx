import React from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';

interface Props {
  color: string;
  header1: string;
  header2: string;
  image: ImageSourcePropType;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  subHeader: string;
  text: string;
  width: number;
}

const StorePlanCard: React.FC<Props> = props => {
  const {
    color,
    header1,
    header2,
    image,
    onPress,
    subHeader,
    text,
    width,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View paddingV-15 style={[{borderTopColor: color, width}, styles.card]}>
        <View flex row marginH-10 paddingB-10 style={styles.headerWrapper}>
          <View>
            <Image source={image} style={styles.image} />
          </View>

          <View marginL-7>
            <View marginB-2>
              <Text style={styles.header}>{header1}</Text>

              <Text style={styles.header}>{header2}</Text>
            </View>

            <Text text100 style={{color}}>
              {subHeader}
            </Text>
          </View>
        </View>

        <View marginT-15 paddingT-13 marginH-10 flex>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderTopWidth: 7,
    backgroundColor: '#ffffff',
  },
  header: {
    color: '#292929',
    fontSize: 18,
  },
  headerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
    maxHeight: 77,
  },
  image: {
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    color: '#393939',
    fontSize: 12,
  },
});

export default StorePlanCard;
