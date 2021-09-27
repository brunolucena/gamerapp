import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import {GamerAppReduxStore} from 'src/Store';
import {deleteProduct} from 'src/Store/Ducks/editProductDuck';
import MyButton from 'src/Components/Button';

interface Props {}

const DeleteProductButton: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {editProduct} = useSelector((state: GamerAppReduxStore) => state);
  const [opened, setOpened] = useState(false);

  const {activeStoreProductCatalogId, loading} = editProduct;

  function handleDelete() {
    dispatch(
      deleteProduct({
        storeProductCatalogId: activeStoreProductCatalogId,
      }),
    );

    handleCloseModal();
  }

  function handleCloseModal() {
    setOpened(false);
  }

  function handleOpenModal() {
    setOpened(true);
  }

  return (
    <View marginR-20>
      <TouchableOpacity onPress={handleOpenModal} style={styles.buttonWrapper}>
        <Ionicons color="#b7b7b7" name="ios-trash" size={26} />
      </TouchableOpacity>

      <Modal isVisible={opened} onBackdropPress={handleCloseModal}>
        <View style={styles.modal}>
          <Text dark10 text60>
            Excluir produto!
          </Text>

          <View row centerV marginT-20>
            <MyButton
              clear
              label="Cancelar"
              onPress={handleCloseModal}
              type="black"
            />

            <MyButton
              disabled={loading}
              label="Confirmar"
              onPress={handleDelete}
              type="secondary"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
});

export default DeleteProductButton;
