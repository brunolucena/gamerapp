import React from 'react';
import {StyleSheet, Picker} from 'react-native';

import {MediaTypeContainer, MediaTypeContent} from './MediaTypeStyles';
import MyListItem from 'src/Components/MyListItem';

interface Props {
  availableMediaTypes: ['Fisica', 'Digital'];
  selectedMediaType: 'Fisica' | 'Digital';
  setSelectedMediaType: (mediaType: 'Fisica' | 'Digital') => any;
}

function MediaType(props: Props) {
  const {availableMediaTypes, selectedMediaType, setSelectedMediaType} = props;

  return (
    <MediaTypeContainer>
      <MyListItem
        hideArrow
        title="Tipo de mídia"
        titleStyle={styles.titleStyle}
      />

      <MediaTypeContent>
        <Picker
          selectedValue={selectedMediaType}
          onValueChange={(itemValue, itemPosition) =>
            setSelectedMediaType(availableMediaTypes[itemPosition])
          }>
          {availableMediaTypes.map((mediaType, index) => (
            <Picker.Item
              key={`${mediaType} - ${index}`}
              label={mediaType}
              value={mediaType}
            />
          ))}
        </Picker>
      </MediaTypeContent>
    </MediaTypeContainer>
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
  listItem: {
    borderRadius: 6,
    paddingBottom: 1,
  },
  listItemContent: {
    margin: 0,
    padding: 0,
  },
  titleStyle: {
    color: '#343434',
  },
});

export default MediaType;
