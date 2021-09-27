import Icon from 'react-native-vector-icons/Ionicons';
import MyButton from 'src/Components/Button';
import React from 'react';
import {MyColors} from 'src/Theme/FoundationConfig';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

interface Props {
  goBackTo?: string;
  title: string | any;
  titleColor?: string;
}

const NewPost: React.FC<Props> = ({goBackTo, title, titleColor}) => {
  const navigation = useNavigation();

  function handleGoBack() {
    if (goBackTo) {
      navigation.navigate(goBackTo);
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <MyButton
        round
        backgroundColor="transparent"
        onPress={handleGoBack}
        size="small">
        <Icon name="md-arrow-back" color={MyColors.primary} size={24} />
      </MyButton>

      {typeof title === 'string' ? (
        <Text color={titleColor || '#333333'}>{title}</Text>
      ) : (
        title
      )}

      <MyButton round backgroundColor="transparent" size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: '#ffffff',
  },
});

export default NewPost;
