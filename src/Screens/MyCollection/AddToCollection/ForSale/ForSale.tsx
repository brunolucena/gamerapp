import React from 'react';
import {StyleSheet} from 'react-native';
// @ts-ignore
import NumericInput from '@wwdrew/react-native-numeric-textinput';

import {
  ForSaleContainer,
  ForSaleContent,
  InputContainer,
} from './ForSaleStyles';
import MyListItem from 'src/Components/MyListItem';
import {MyColors} from 'src/Theme/FoundationConfig';
import Heading from 'src/Components/Heading';

interface Props {
  forSale: boolean;
  price: number | string;
  setForSale: Function;
  setPrice: Function;
}

function ForSale(props: Props) {
  const {forSale, price, setForSale, setPrice} = props;

  function renderInputContainer() {
    return (
      <InputContainer>
        <NumericInput
          type="currency"
          currency="BRL"
          locale="pt-Br"
          decimalPlaces={2}
          value={price}
          onUpdate={(value: any) => setPrice(value)}
          placeholder="R$0,00"
          fontSize={20}
          padding={0}
          margin={0}
          marginBottom={5}
        />
      </InputContainer>
    );
  }

  function handleSetForSale() {
    setForSale(!forSale);
  }

  return (
    <ForSaleContainer>
      <MyListItem
        onPress={handleSetForSale}
        switchProps={{
          onValueChange: handleSetForSale,
          thumbColor: forSale ? MyColors.secondary : '#e5e5e5',
          value: forSale,
        }}
        title="Quero vender"
        titleStyle={styles.titleStyle}
      />

      {forSale && (
        <ForSaleContent>
          <Heading h5>Por qual valor você gostaria de vender?</Heading>

          {renderInputContainer()}
        </ForSaleContent>
      )}
    </ForSaleContainer>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: '#343434',
  },
  titleStyle2: {
    flex: 1,
    color: '#2c2c2c',
    fontSize: 14,
  },
});

export default ForSale;
