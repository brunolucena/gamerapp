import React from 'react';
import {StyleSheet, Picker} from 'react-native';

import {ActiveAddGameToCollectionPlatform} from '../../../../Models/GamerProductCollection';

import {PlatformContainer, PlatformContent} from './PlatformStyles';
import MyListItem from 'src/Components/MyListItem';

interface Props {
  availablePlatforms: ActiveAddGameToCollectionPlatform[];
  selectedPlatformId: string;
  setSelectedPlatform: (platform: ActiveAddGameToCollectionPlatform) => any;
}

function Platform(props: Props) {
  const {availablePlatforms, selectedPlatformId, setSelectedPlatform} = props;

  return (
    <PlatformContainer>
      <MyListItem hideArrow title="Console" titleStyle={styles.titleStyle} />

      <PlatformContent>
        <Picker
          selectedValue={selectedPlatformId}
          onValueChange={(itemValue, itemPosition) =>
            setSelectedPlatform(availablePlatforms[itemPosition])
          }>
          {availablePlatforms.map(({name, id}, index) => (
            <Picker.Item key={`${id} - ${index}`} label={name} value={id} />
          ))}
        </Picker>
      </PlatformContent>
    </PlatformContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    color: '#343434',
  },
  inputContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: 'center',
  },
  titleStyle: {
    color: '#343434',
  },
  listItemContent: {
    margin: 0,
    padding: 0,
  },
});

export default Platform;
