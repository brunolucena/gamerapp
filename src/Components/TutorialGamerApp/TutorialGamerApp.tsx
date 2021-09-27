import React, {useState} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Image, View} from 'react-native-ui-lib';
// @ts-ignore
import TypeWriter from 'react-native-typewriter';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import {
  DialogBottom,
  DialogContainer,
  DialogContent,
  DialogText,
  DialogTop,
} from './TutorialGamerAppStyles';
import {MyColors} from 'src/Theme/FoundationConfig';
import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import { completeTutorial } from 'src/Store/Ducks/tutorialDuck';
import { Tutorials } from './Tutorials';

export interface TutorialText {
  title?: string;
  /** maxLength = 257 */
  text: string;
}

interface Props {
  screen: string;
}

function TutorialGamerApp(props: Props) {
  const dispatch = useDispatch();

  let screen = props.screen;
  
  const [clicked, setClicked] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const animatedValue = new Animated.Value(0);

  const {config, tutorial: tutorialRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const tutorial = tutorialRedux[screen];
  const tutorialTexts = Tutorials[screen];

  const active = tutorial?.active;
  const completed = tutorial ? tutorial.completed : true;
  const texts = tutorialTexts ? tutorialTexts.texts : [];

  const show = texts.length > 0 && !completed && active;

  const onEnd = () => {
    dispatch(completeTutorial(screen));
    setCurrentTextIndex(0);
  }

  const animateForward = () => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.quad,
      useNativeDriver: false,
    }).start(() => animateBackward());
  };

  const animateBackward = () => {
    animatedValue.setValue(1);

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => animateForward());
  };

  const animation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 11],
  });

  animateForward();

  const onTypingEnd = () => {
    setIsTyping(false);
  };

  const hasNextText = (): boolean => {
    return texts.length > currentTextIndex + 1;
  };

  const onPress = () => {
    if (isTyping) {
      setClicked(true);
      setIsTyping(false);
    } else {
      if (hasNextText()) {
        toNextText();
      } else {
        onEnd();
      }
    }
  };

  const toNextText = () => {
    setClicked(false);
    setIsTyping(true);
    setCurrentTextIndex(currentTextIndex + 1);
  };

  const text = texts?.length > 0 ? texts[currentTextIndex]?.text : "";
  const title = texts?.length > 0 ? texts[currentTextIndex]?.title : "";
  
  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={show}
      onBackdropPress={onPress}
      style={styles.modal}>
      <View>
        <View center marginB-30>
          <Image resizeMode="contain" source={require('../../Assets/images/gamer_rex.png')} style={styles.gamerRex} />
        </View>

        <DialogContainer>
          <DialogTop>{title || 'GamerRex'}</DialogTop>

          <DialogContent>
            {clicked ? (
              <DialogText>{text}</DialogText>
            ) : (
              <TypeWriter
                minDelay={0}
                maxDelay={1}
                onTypingEnd={onTypingEnd}
                style={styles.typeWriter}
                typing={1}>
                {text}
              </TypeWriter>
            )}
          </DialogContent>

          <DialogBottom>
            <Animated.View style={[styles.animatedView, {bottom: animation}]}>
              <Icon
                name="md-arrow-dropdown"
                style={{...(isTyping && styles.iconHidden)}}
                size={22}
                color={MyColors.primary}
              />
            </Animated.View>
          </DialogBottom>
        </DialogContainer>
      </View>
    </Modal>
  );
}

TutorialGamerApp.defaultProps = {
  texts: [
    {
      title: 'GamerRex',
      text:
        'Olá! Este é um Tutorial de exemplo para ser utilizado no storybook. Nele veremos o visual do tutorial.',
    },
    {
      title: 'Bruno',
      text: 'Aqui podemos ver como o título e o texto mudaram',
    },
    {
      text:
        'E se você clickar na tela antes do texto acabar de ser digitado, ele finaliza de uma vez. Vamos lá, tente na próxima tela.',
    },
    {
      text:
        'Este é um texto bem grande pra textar a funcionalidade de clickar na tela pra finalizar o texto de uma vez. Como eu não sei mais o que escrever, vou só escrever coisas aleatórias... bicicleta, abacate, fone de ouvido. Sei lá, as vezes parece que não sei.',
    },
    {
      text: 'Agora só falta fazer os tutoriais',
    },
  ],
};

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    right: 10,
  },
  gamerRex: {
    width: 90,
    transform: [
      {
        rotate: "-45deg"
      }
    ]
  },
  iconHidden: {
    opacity: 0,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
  },
  typeWriter: {
    color: '#828282',
    flexWrap: 'wrap',
  },
});

export default TutorialGamerApp;
