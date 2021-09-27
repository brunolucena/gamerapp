import * as RootNavigation from '../Screens/RootNavigation';
import { ACCEPT_TRADE_REQUEST_FAILURE, SAVE_TRADE_REQUEST_FAILURE } from 'src/Store/Ducks/tradeRequestDetails';
import { ActionAnyData, ActionAnyPayload } from 'src/Models/ReduxModels';
import { ADD_QUICK_PRODUCTS_FAIL } from 'src/Store/Ducks/gamer';
import { BaseErrorResponse } from 'src/Models/Login';
import { CHANGE_MY_ORDER_STATUS_FAILURE } from 'src/Store/Ducks/sellerOrderDuck';
import { CREATE_STORE_FAIL } from 'src/Store/Ducks/registerStore';
import { CUSTOMER_ACCOUNT_ADD_FAILURE, GET_CUSTOMER_ACCOUNTS_LIST_FAILURE, TRANSFER_WITHDRAW_FAILURE } from 'src/Store/Ducks/bankAccountDuck';
import {
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_DETAILS_FAILURE,
  EDIT_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE
  } from 'src/Store/Ducks/editProductDuck';
import { findErrorMessage } from 'src/Helpers/functions';
import { FORGOT_PASSWORD_FAILURE } from 'src/Store/Ducks/signup';
import { GET_COUPON_LIST_FAILURE } from 'src/Store/Ducks/couponDuck';
import { GET_GAMER_PRODUCT_DETAILS_FAILURE } from 'src/Store/Ducks/gamerProductDetailsDuck';
import { GET_MY_COLLECTION_FAIL, GET_MY_WISHLIST_FAIL } from 'src/Store/Ducks/myCollection';
import { GET_TRADE_DETAILS_FAILURE, SET_DELIVERY_STATUS_FAILURE, SET_TRADE_RATING_FAILURE } from 'src/Store/Ducks/tradeDetails';
import { INSERT_TOAST_TO_QUEUE } from 'src/Store/Ducks/toastDucks';
import { IToastOpts, WToast } from 'react-native-smart-tip';
import { MyColors } from 'src/Theme/FoundationConfig';
import { NEW_POST_FAILURE, NEW_POST_SUCCESS } from 'src/Store/Ducks/postDuck';
import { put, takeLatest } from 'redux-saga/effects';
import { SELLER_ADD_PRODUCT_FAIL } from 'src/Store/Ducks/sellerAddProduct';
import { SELLER_UPDATE_PICTURE_FAILURE } from 'src/Store/Ducks/sellerDucks';
import { SET_PROFILE_PICTURE_FAILURE } from 'src/Store/Ducks/user';
import { Toast } from '../Models/Toast';

function getErrorMessage(type: string, payload: BaseErrorResponse): string {
  switch(type) {
    case ACCEPT_TRADE_REQUEST_FAILURE: {
      return findErrorMessage(payload, "Houve um erro ao aceitar a proposta. Por favor tente novamente.");
    }
    
    case ADD_QUICK_PRODUCTS_FAIL: {
      return findErrorMessage(payload, "Não foi possível adicionar o jogo a sua coleção.")
    }

    case CHANGE_MY_ORDER_STATUS_FAILURE: {
      return findErrorMessage(payload, "Não foi possível alterar o status do pedido.");
    }

    case CREATE_STORE_FAIL: {
      return findErrorMessage(payload, "Não foi possível criar a loja. Verifique os dados e tente novamente.");
    }

    case CUSTOMER_ACCOUNT_ADD_FAILURE: {
      return findErrorMessage(payload, "Não foi possível salvar a conta bancária.");
    }

    case EDIT_PRODUCT_DETAILS_FAILURE: {
      return findErrorMessage(payload, 'Não foi possível editar o produto.');
    }

    case FORGOT_PASSWORD_FAILURE: {
      return findErrorMessage(payload, 'Não foi possível enviar sua senha. Verifique o email informado.')
    }

    case GET_COUPON_LIST_FAILURE: {
      return findErrorMessage(payload, 'Não foi possível carregar a lista de cupons.')
    }

    case GET_CUSTOMER_ACCOUNTS_LIST_FAILURE: {
      return findErrorMessage(payload, "Não foi possível carregas suas contas bancárias.");
    }

    case GET_GAMER_PRODUCT_DETAILS_FAILURE: {
      return findErrorMessage(payload, "Houve um erro ao carregar o produto.");
    }

    case GET_MY_COLLECTION_FAIL: {
      return findErrorMessage(payload, "Não foi possível carregar sua coleção.");
    }

    case GET_MY_WISHLIST_FAIL: {
      return findErrorMessage(payload, "Não foi possível carregar sua wishlist.");
    }

    case GET_PRODUCT_DETAILS_FAILURE: {
      return findErrorMessage(payload, 'Não foi possível pegar os dados do produto.');
    }

    case GET_TRADE_DETAILS_FAILURE: {
      return findErrorMessage(payload, "Não foi possível carregar essa troca. Por favor tente novamente.");
    }

    case NEW_POST_FAILURE: {
      return findErrorMessage(payload, "Houve um erro ao salvar o seu post. Por favor tente novamente.");
    }

    case SAVE_TRADE_REQUEST_FAILURE: {
      return findErrorMessage(payload, "Houve um erro ao enviar a proposta de troca. Por favor tente novamente.");
    }

    case SELLER_ADD_PRODUCT_FAIL: {
      return findErrorMessage(payload, "Não foi possível salvar o produto. Verifique os dados e tente novamente.");
    }

    case SELLER_UPDATE_PICTURE_FAILURE: {
      return findErrorMessage(payload, "Não foi possível atualizar a foto de capa. Por favor tente novamente.")
    }

    case SET_DELIVERY_STATUS_FAILURE: {
      return findErrorMessage(payload, "Não foi possível alterar o status da troca. Por favor tente novamente.");
    }

    case SET_PROFILE_PICTURE_FAILURE: {
      return findErrorMessage(payload, "Não foi possível trocar a foto de perfil.");
    }

    case SET_TRADE_RATING_FAILURE: {
      return findErrorMessage(payload, "Não foi possível avaliar a troca. Por favor tente novamente.");
    }

    case TRANSFER_WITHDRAW_FAILURE: {
      return findErrorMessage(payload, "Não foi possível realizar o saque.");
    }

    default: {
      return 'Ocorreu um erro. Tente novamente.';
    }
  }
}
function getSuccessMessage(type: string): string {
  switch(type) {
    default: {
      return 'Sucesso!';
    }
  }
}

function navigate(type: string) {
  switch (type) {
    case DELETE_PRODUCT_SUCCESS:
    case EDIT_PRODUCT_DETAILS_SUCCESS: {
      RootNavigation.navigate("Store");

      break;
    }

    case GET_GAMER_PRODUCT_DETAILS_FAILURE: {
      if (RootNavigation.canGoBack()) {
        RootNavigation.goBack();
      }

      break;
    }

    case GET_TRADE_DETAILS_FAILURE: {
      RootNavigation.navigate("TradeListConcluidas");

      break;
    }

    case NEW_POST_SUCCESS: {
      RootNavigation.navigate('Home', {screen: 'Feed'});
    }

    default: {
      return;
    }
  }
}

function* insertToastToQueueSaga(action: ActionAnyData<Toast>) {
  try {
    const toast = action.payload.data;

    const {message, type} = toast;

    const toastOptions: IToastOpts = {
      backgroundColor:
        type === 'error'
          ? MyColors.warn
          : type === 'success'
          ? MyColors.primary
          : '#444444',
      data: message,
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
      textColor: '#ffffff',
    };

    WToast.show(toastOptions);
  } catch (e) {}
}

function* getAllFailuresSaga(action: any) {
  try {
    const toastAction: ActionAnyPayload<{data: Toast}> = {
      payload: {
        data: {
          message: getErrorMessage(action?.type, action?.payload),
          type: 'error',
        },
      },
      type: INSERT_TOAST_TO_QUEUE,
    };

    navigate(action?.type);
    yield put(toastAction);
  } catch (e) {
    console.log({e});
  }
}

function* getAllSuccessSaga(action: any) {
  try {
    const toastAction: ActionAnyPayload<{data: Toast}> = {
      payload: {
        data: {
          message: getSuccessMessage(action?.type),
          type: 'success',
        },
      },
      type: INSERT_TOAST_TO_QUEUE,
    };

    navigate(action?.type);
    yield put(toastAction);
  } catch (e) {
    console.log({e});
  }
}

function* getAllSuccessNavigateSaga(action: any) {
  try {
    navigate(action?.type);
  } catch (e) {
    console.log({e});
  }
}

export default [
  takeLatest(INSERT_TOAST_TO_QUEUE, insertToastToQueueSaga),
  takeLatest([
    ACCEPT_TRADE_REQUEST_FAILURE,
    ADD_QUICK_PRODUCTS_FAIL,
    CHANGE_MY_ORDER_STATUS_FAILURE,
    CREATE_STORE_FAIL,
    CUSTOMER_ACCOUNT_ADD_FAILURE,
    EDIT_PRODUCT_DETAILS_FAILURE,
    FORGOT_PASSWORD_FAILURE,
    GET_COUPON_LIST_FAILURE,
    GET_CUSTOMER_ACCOUNTS_LIST_FAILURE,
    GET_GAMER_PRODUCT_DETAILS_FAILURE,
    GET_MY_COLLECTION_FAIL,
    GET_MY_WISHLIST_FAIL,
    GET_PRODUCT_DETAILS_FAILURE,
    GET_TRADE_DETAILS_FAILURE,
    SAVE_TRADE_REQUEST_FAILURE,
    SELLER_ADD_PRODUCT_FAIL,
    SELLER_UPDATE_PICTURE_FAILURE,
    SET_DELIVERY_STATUS_FAILURE,
    SET_PROFILE_PICTURE_FAILURE,
    SET_TRADE_RATING_FAILURE,
    TRANSFER_WITHDRAW_FAILURE,
  ], getAllFailuresSaga),
  takeLatest([], getAllSuccessSaga),
  takeLatest([
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_DETAILS_SUCCESS,
    NEW_POST_SUCCESS,
  ], getAllSuccessNavigateSaga),
];
