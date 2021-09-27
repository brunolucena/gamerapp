import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, View, Text, Image } from 'react-native';
import {FlexAlignType, StyleProp, TextStyle} from 'react-native';

interface CardProps {
    color?: string,
    name?: string
}

const card_images = {
    black: require('./assets/black.png'),
    blue: require('./assets/blue.png'),
    red: require('./assets/red.png'),
    green: require('./assets/green.png'),
    silver: require('./assets/silver.png')
}

const CardWithNickName: React.SFC<CardProps> = props => {
    const {
        color,
        name
    } = props;

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 250,
            // justifyContent: 'center',
            // alignItems: 'flex-start',
            margin: 0,
            padding: 0
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            margin: 0,
            padding: 0
        },
        innerTextWhite: {
            position: 'absolute',
            left: '19%',
            bottom: '40%',
            fontFamily: 'Montserrat',
            color: '#FFF'
        },
        innerText: {
            position: 'absolute',
            left: '19%',
            bottom: '40%',
            fontFamily: 'Montserrat',
            color: (props.color == 'silver' ? '#9F9F9F' : '#FFF')
        }
    })

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={card_images[props.color]}/>
            <Text style={styles.innerText}>{props.name}</Text>
        </View>
    );
};

CardWithNickName.defaultProps = {
    color: 'black',
    name: ''
};



export default CardWithNickName;