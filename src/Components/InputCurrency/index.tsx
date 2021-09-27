import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {roundTo2} from 'src/Helpers/functions';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from '../Button';

const {width} = Dimensions.get('window');

type InputType = 'currency' | 'int';

export interface InputCurrencyProps {
  initialValue?: number;
  onCancel: Function;
  onConfirm: (value: number) => any;
  textCancel?: string;
  textConfirm?: string;
  type?: InputType;
}

/**
 * Input para digitar valores monetários.
 */
const InputCurrency: React.SFC<InputCurrencyProps> = props => {
  const {
    initialValue,
    onCancel,
    onConfirm,
    textCancel,
    textConfirm,
    type,
  } = props;

  // Define o inputs com o valor do initialValue caso seja maior que 0.
  const [inputsState, setInputsState] = useState<any[]>([
    !!initialValue ? initialValue : '0',
  ]);

  /**
   * Adiciona um input no inputsState.
   */
  function addInput(input: number | string) {
    if (input === '=') {
      executeCalc();
    } else {
      let newInputsState = [...inputsState];

      const length = inputsState.length;
      const firstChar = inputsState[0];

      // Se o valor atual for 0 e somente 0, tira ele pra colocar o novo
      // input.
      if (length === 1 && (firstChar === '0' || firstChar === 0)) {
        newInputsState.pop();
      }

      newInputsState.push(input);

      setInputsState(newInputsState);
    }
  }

  /**
   * Deleta o último input do inputsState.
   */
  function deleteInput() {
    let newInputsState = [...inputsState];

    newInputsState.pop();

    setInputsState(newInputsState);
  }

  /**
   * Deleta todos os inputs do inputsState.
   */
  function deleteInputs() {
    setInputsState([0]);
  }

  /**
   * Executa o cálculo do inputsState, arrendondando para duas casas
   * decimais o valor final. Caso o valor seja null, retorna 0.
   * O valor final é colocado no inputsState como string.
   * Ex: [1, 2, "+", 3, ".", 5] = "15.50"
   * Ex: [0] = "0.00"
   * Ex: [1, "+"] = "0"
   */
  function executeCalc() {
    const result = getInputsCalc(inputsState);

    // Se o valor for null ou algum outro, coloca 0 como o valor do
    // inputsState
    if (typeof result !== 'number') {
      setInputsState(['0']);

      return;
    }

    const rounded = roundTo2(result, 2);

    // Transforma o valor final em um array de strings.
    // Ex: 25.50 = ["2", "5", ".", "5", "0"]
    const roundedStringArray = [...String(rounded)];

    setInputsState(roundedStringArray);
  }

  /**
   * Pega todos os valores do inputs e retorna o valor final.
   * Caso a expressão do inputs seja inválida, retorna null.
   * Ex: [1, 2, "+", 3, ".", 5] = 15.50
   * Ex: [1, 2, "+", 3, ".", 5, "+"] = null
   */
  function getInputsCalc(inputs: any[]): number | null {
    let result = 0;

    try {
      const inputsString = getInputsString(inputs);

      result = eval(inputsString);
    } catch (error) {
      return null;
    }

    return result;
  }

  /**
   * Retorna o inputs em formato de string.
   * Ex: [1, 2, "+", 3, ".", 5] = "12+3.5"
   */
  function getInputsString(inputs: any[]): string {
    return inputs.join('');
  }

  /**
   * Ao pressionar em cancelar, executa o onCancel
   */
  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  /**
   * Ao pressionar em finalizar, executa o onFinish.
   */
  function handleConfirm() {
    if (onConfirm) {
      let value = getInputsCalc(inputsState);

      if (value && type === 'int') {
        value = parseInt(String(value));
      }

      onConfirm(value || 0);
    }
  }

  /**
   * Renderiza os botões.
   */
  function renderBottomActions() {
    return (
      <View style={styles.bottom}>
        <MyButton
          label={textCancel}
          onPress={handleCancel}
          style={styles.button}
          outline
        />
        <MyButton
          label={textConfirm}
          onPress={handleConfirm}
          style={styles.button}
        />
      </View>
    );
  }

  /**
   * Renderiza o display.
   */
  function renderDisplay() {
    return (
      <View style={styles.displayContainer}>
        <View>
          <Text dark20 text80>
            {type === 'currency' && 'R$'}
          </Text>
        </View>

        <View right row centerV>
          <Text marginR-30 style={styles.numberStyle}>
            {getInputsString(inputsState)}
          </Text>

          <MaterialCommunityIcons
            color="#474747"
            name="backspace"
            onLongPress={deleteInputs}
            onPress={deleteInput}
            size={25}
          />
        </View>
      </View>
    );
  }

  /**
   * Renderiza os inputs.
   */
  function renderInputButtons() {
    const inputButtons = [
      [7, 8, 9, '+'],
      [4, 5, 6, '-'],
      [1, 2, 3, '*'],
      ['.', 0, '=', '/'],
    ];

    function renderInputButton(button: number | string) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => addInput(button)}
          style={styles.inputButton}>
          <Text style={styles.inputButtonText}>{button}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.inputsContainer}>
        {inputButtons.map(row => {
          return (
            <View style={styles.row}>
              {row.map(button => renderInputButton(button))}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {renderDisplay()}
      {renderInputButtons()}
      {renderBottomActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  button: {
    flex: 1,
    borderRadius: 30,
  },
  displayContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputsContainer: {
    flex: 1,
  },
  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#424242',
  },
  numberStyle: {
    color: '#474747',
    fontSize: 32,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: MyColors.primary,
  },
  wrapper: {
    flex: 1,
    width,
  },
});

InputCurrency.defaultProps = {
  initialValue: 0,
  textCancel: 'CANCELAR',
  textConfirm: 'CONCLUÍDO',
  type: 'currency',
};

export default InputCurrency;
