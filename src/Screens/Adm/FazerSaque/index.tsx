import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {Picker, StyleSheet, ScrollView} from 'react-native';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {MyColors} from 'src/Theme/FoundationConfig';
// @ts-ignore
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyButton from 'src/Components/Button';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomerAccountsList, customerAccountAdd, transferWithdraw, selectMyBankAccounts, getBanks, selectMyGamerPayAccount} from 'src/Store/Ducks/bankAccountDuck';
import {GamerAppReduxStore} from 'src/Store';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';

const FazerSaque = () => {
  const dispatch = useDispatch();

  const {bankAccount, customerAccount, user} = useSelector((state: GamerAppReduxStore) => state);

  const {gamerId: customerId} = user.user;
  const {banks: availableBanks, loading} = bankAccount;
  const {amount: available, toDebit, toReceive} = customerAccount;

  const accounts = selectMyBankAccounts(bankAccount);
  const gamerPayAccount = selectMyGamerPayAccount(bankAccount);

  useEffect(() => {
    dispatch(getCustomerAccountsList(customerId));
  }, [customerId, dispatch]);

  useEffect(() => {
    dispatch(getBanks({page: 1, searchText: ''}));
  }, [customerId, dispatch]);

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.accountId || "1");
  const [valor, setValor] = useState(available);

  const [branch, setBranch] = useState("");
  const [number, setNumber] = useState("");
  const [isAddAccountVisible, setIsAddAccountVisible] = useState(
    accounts.length === 0,
  );
  const [selectedBankId, setSelectedBankId] = useState(availableBanks[0]?.bankId || "");

  function handleAddAccount() {    
    if (selectedBankId && branch && number) {
      const bank = availableBanks.find(bank => bank.bankId === selectedBankId);

      dispatch(customerAccountAdd({
        bankId: selectedBankId,
        branch,
        code: bank ? bank.code : "",
        customerId,
        number
      }));

      setIsAddAccountVisible(false);
      setBranch("");
      setNumber("");
    }
  }

  function handleAddAccountVisible() {
    setIsAddAccountVisible(true);
  }

  function handleConfirm() {
    dispatch(transferWithdraw({
      amount: valor,
      fromAccountId: gamerPayAccount?.accountId || '',
      toAccountId: selectedAccount,
    }));
  }

  function handleSetValue(value: any) {
    setValor(value);
  }

  function handleSelectAccount(accountId: string) {
    setSelectedAccount(accountId);
  }

  function isAccountSelected(accountId: string): boolean {
    return accountId === selectedAccount;
  }

  const isValid = valor <= available && available > 0;

  function renderAccounts() {
    return (
      <View marginT-20>
        <View row centerV>
          <Text dark10 text70>
            Conta bancária
          </Text>

          <Text dark30 text100 marginL-10 marginR-90 style={styles.smallText}>
            A conta precisa estar no mesmo CPF/CNPJ
          </Text>
        </View>

        <View marginT-10>
          {accounts.map((account, index) => {
            const {
              accountId,
              bankName,
              branch,
              code,
              number,
            } = account;

            const isSelected = isAccountSelected(accountId);

            return (
              <TouchableOpacity
                onPress={() => handleSelectAccount(accountId)}
                key={`${accountId} - ${index}`}>
                <View style={[styles.card, isSelected && styles.cardActive]}>
                  <View style={styles.iconWrapper}>
                    {isSelected && (
                      <Ionicons
                        name="md-checkmark"
                        color={MyColors.primary}
                        size={20}
                      />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.cardText,
                      isSelected && styles.cardTextActive,
                    ]}>
                    {bankName} - {code}
                  </Text>

                  <Text
                    style={[
                      styles.cardText,
                      isSelected && styles.cardTextActive,
                    ]}>
                    {branch} {number}
                  </Text>

                  {/* <Text
                    style={[
                      styles.cardText,
                      isSelected && styles.cardTextActive,
                    ]}>
                    {ownerName}
                  </Text> */}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  function renderAddAccount() {
    return (
      <View marginV-20>
        <Text marginB-10 dark10 text70>
            Adicionar conta bancária
          </Text>

          <View style={styles.inputWrapper3}>    
            <Picker
              selectedValue={selectedBankId}
              onValueChange={(itemValue, itemPosition) => {
                const bank = availableBanks[itemPosition];
                
                setSelectedBankId(bank.bankId);
              }}>
                {availableBanks.map((bank, index) => {
                  const { bankId,code, name } = bank;
                  
                  return (
                    <Picker.Item
                      key={`${bankId} - ${index}`}
                      label={`${name} - ${code}`}
                      value={bankId}
                    />
                  )
                })}
            </Picker> 
          </View>

          <View marginT-10 style={styles.inputWrapper2}>
            <TextInput
              placeholder="Agência"
              style={styles.inputStyle}
              onChangeText={text => setBranch(text)}
              value={branch}
            />
          </View>

          <View marginV-10 style={styles.inputWrapper2}>
            <TextInput
              placeholder="Conta com dígito"
              style={styles.inputStyle}
              onChangeText={text => setNumber(text)}
              value={number}
            />
          </View>

          <MyButton clear label="Adicionar conta bancária" onPress={handleAddAccount} size="medium" type="secondary" />
      </View>
    );
  }

  function renderImage() {
    return (
      <View centerH paddingH-15 paddingB-15 style={styles.gamerPayWrapper}>
        <Image
          source={require('../../../Assets/images/gamer_pay.png')}
          style={styles.gamerPay}
        />
      </View>
    );
  }

  function renderInput() {
    return (
      <View>
        <Text dark10 text70>
          Valor do saque
        </Text>

        <View row centerV marginT-10>
          <View style={styles.inputWrapper}>
            <NumericInput
              type="currency"
              currency="BRL"
              locale="pt-Br"
              decimalPlaces={2}
              value={valor}
              onUpdate={handleSetValue}
              placeholder="R$0,00"
              fontSize={20}
              padding={0}
              margin={0}
            />
          </View>

          <Text dark30 text100 marginL-15 marginR-100 style={styles.smallText}>
            O valor mínimo para saque sem taxa é de R$ 100,00, para saques
            abaixo de R$100,00, há uma taxa de R$ 4,50.
          </Text>
        </View>
      </View>
    );
  }

  function renderTop() {
    return (
      <View style={styles.top} padding-20>
        <Text dark10 text60>
          {formatCurrency(available)}
        </Text>
        <Text dark30 text80>
          Saldo disponível para saque
        </Text>
      </View>
    );
  }

  function renderButton() {
    return (
      <View>
        <Text center marginT-10 marginB-15  style={styles.valorSaque}>
          Valor líquido do saque: {formatCurrency(valor - 3.5)}
        </Text>

        <MyButton
          disabled={false}
          label="Confirmar saque"
          onPress={handleConfirm}
        />

        <Text text100 dark40 center marginB-15 marginH-5>
          O saque é feito em modalidade TED e passa por análise anti-fraude, podendo levar até 5 dias úteis para compensar.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.contentWrapper}>
        {renderImage()}

        <View style={styles.content}>
          {renderTop()}

          <View padding-20>
            {renderInput()}

            {renderAccounts()}

            {isAddAccountVisible ? (
              renderAddAccount()
            ) : (
              <MyButton
                clear
                label="Adicionar conta"
                onPress={handleAddAccountVisible}
                size="xSmall"
                style={styles.buttonAddAccount}
                type="secondary"
              />
            )}
          </View>

          <View paddingH-10>{renderButton()}</View>
        </View>
      </ScrollView>

      <CustomActivityIndicator isVisible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAddAccount: {
    justifyContent: 'flex-start',
  },
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#9b9b9b',
    borderWidth: 1,
  },
  cardActive: {
    borderColor: '#279f20',
  },
  cardText: {
    color: '#8e8e8e',
  },
  cardTextActive: {
    color: '#279f20',
  },
  content: {
    backgroundColor: "#ffffff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  gamerPay: {
    width: 200,
    resizeMode: 'contain',
  },
  gamerPayWrapper: {
    backgroundColor: '#f5f5f5',
  },
  iconWrapper: {
    position: 'absolute',
    top: 1,
    right: 6,
  },
  inputStyle: {
    paddingVertical: 0,
  },
  inputWrapper: {
    padding: 10,
    borderColor: MyColors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputWrapper2: {
    flex: 1,
    padding: 10,
    borderColor: MyColors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputWrapper3: {
    flex: 1,
    borderColor: MyColors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  smallText: {
    lineHeight: 14,
  },
  top: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  valorSaque: {
    color: MyColors.primary,
  },
  wrapper: {
    flex: 1,
  },
});

export default FazerSaque;
