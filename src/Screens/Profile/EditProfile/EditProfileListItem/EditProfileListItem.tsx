import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputAndroidProps,
  TextInputIOSProps,
  TextInputProps,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native';
import {MaskService} from 'react-native-masked-text';

import * as Yup from 'yup';
import MyListItem from 'src/Components/MyListItem';
import MyTextField from 'src/Components/TextField';
import {FormikProps, withFormik} from 'formik';

interface FormValues {
  cpf?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}

interface Props
  extends TextInputIOSProps,
    TextInputAndroidProps,
    TextInputProps {
  containerStyle?: ViewStyle;
  disabled?: boolean;
  fieldName: string;
  handleOnSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    label: string,
  ) => void;
  hideChevron?: boolean;
  isCard?: boolean;
  label: string;
  onChangeText: (text: string) => void;
  title?: string;
  value: string;
}

const EditProfileListItem = (props: Props & FormikProps<FormValues>) => {
  const {
    autoCompleteType,
    containerStyle,
    disabled,
    errors,
    fieldName,
    handleOnSubmitEditing,
    hideChevron,
    isCard,
    keyboardType,
    label,
    maxLength,
    onChangeText,
    textContentType,
    title,
    touched,
    values,
  } = props;

  const value = props.value || '';

  const getError = () => {
    const {cpf, fullName, phoneNumber} = errors;

    if (fieldName === 'cpf') {
      return cpf;
    } else if (fieldName === 'fullName') {
      return fullName;
    } else if (fieldName === 'phoneNumber') {
      return phoneNumber;
    }
  };

  const getValue = () => {
    const {cpf, email, fullName, phoneNumber} = values;

    if (fieldName === 'cpf') {
      return cpf ? cpf : MaskService.toMask('cpf', value);
    } else if (fieldName === 'email') {
      return email ? email : value;
    } else if (fieldName === 'fullName') {
      return fullName ? fullName : value;
    } else if (fieldName === 'phoneNumber') {
      return phoneNumber ? phoneNumber : MaskService.toMask('cel-phone', value);
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    let maskedValue = value;

    if (fieldName === 'phoneNumber') {
      maskedValue = MaskService.toMask('cel-phone', value);
    } else if (fieldName === 'cpf') {
      maskedValue = MaskService.toMask('cpf', value);
    }

    props.handleChange(fieldName)(maskedValue);
    onChangeText(value);
  };

  /**
   * Verifica se o campo possui algum erro antes de enviar os dados
   */
  const onSubmitEditingHandler = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    label: string,
  ) => {
    const {cpf, fullName, phoneNumber} = errors;

    if (fieldName === 'cpf' && cpf) {
      return;
    } else if (fieldName === 'fullName' && fullName) {
      return;
    } else if (fieldName === 'phoneNumber' && phoneNumber) {
      return;
    }

    handleOnSubmitEditing(e, label);
  };

  return (
    <MyListItem
      containerStyle={containerStyle}
      hideArrow={hideChevron}
      isCard={isCard}
      leftElement={
        <MyTextField
          autoCompleteType={autoCompleteType}
          containerStyle={styles.container}
          editable={!disabled}
          error={touched ? getError() : ''}
          handleChangeText={text => handleChange(fieldName, text)}
          hideUnderline
          keyboardType={keyboardType}
          maxLength={maxLength}
          onSubmitEditing={e => onSubmitEditingHandler(e, label)}
          placeholder={label}
          textContentType={textContentType}
          title={title || label}
          titleStyle={styles.titleStyle}
          value={getValue()}
        />
      }
      // bottomDivider
      title=""
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 55,
  },
  titleStyle: {
    color: '#2b2b2b',
    fontWeight: '400',
  },
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    cpf: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    cpf: Yup.string()
      .min(14, 'CPF inválido')
      .max(14, 'CPF inválido'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Informe um email'),
    fullName: Yup.string().required('Informe seu nome completo'),
    phoneNumber: Yup.string()
      .min(15, 'Informe um telefone válido')
      .max(15, 'Informe um telefone válido'),
  }),
})(EditProfileListItem);
