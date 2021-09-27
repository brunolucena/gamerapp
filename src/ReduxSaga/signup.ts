import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {
  CREATE_USER,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  SEND_VERIFICATION_CODE_SIGNUP,
  SEND_VERIFICATION_CODE_SIGNUP_FAIL,
  SEND_VERIFICATION_CODE_SIGNUP_SUCCESS,
  UPDATE_HEARTS,
  VALIDATE_VERIFICATION_CODE,
  VALIDATE_VERIFICATION_CODE_FAIL,
  VALIDATE_VERIFICATION_CODE_SUCCESS,
} from 'src/Store/Ducks/signup';

import {
  CreateUserRequest,
  SendVerificationCodeSignupResponse,
  ValidateVerificationCodeResponse,
  ForgotPasswordRequest,
} from '../Models/Signup';
import {Alert} from 'react-native';
import {Action, ActionAnyPayload} from 'src/Models/ReduxModels';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gameOverPhrases = [
  'Snake. Snaake. Snaaaaaake!',
  'Desculpe, estou em outro castelo',
  'O cara era tão viciado em videogames, que quando morreu, escreveram “GAME OVER” na lápide dele.',
  'Estou vivendo uma fase tão difícil na minha vida, que nem o Super Mario conseguiria passar.',
  'Pra todo “game over” existe um “play again”',
  'A vida é como nos videogames, existem fases e mais fases, mas você só vai pra frente quando passa pelos inimigos mais fortes.',
  'Você não está preparado!',
  'O bolo é uma mentira',
  'Darn it. I lose.',
  'Essa foi por pouco, quase você vira um sanduíche de Jill!',
];

function getRandomGameOverPhrase(): string {
  const randomIndex = getRandomInt(0, gameOverPhrases.length - 1);

  return gameOverPhrases[randomIndex];
}

function* createUserSaga(action: Action<CreateUserRequest>) {
  try {
    const payload = yield call(Api, action, true);

    yield put({type: CREATE_USER_SUCCESS, payload});

    console.log('oii');

    NavigationService.navigate('Onboarding', {screen: 'OnboardingInit'});
  } catch (e) {
    let error = e;

    if (e.length > 0) {
      error = e[0];
    }

    yield put({type: CREATE_USER_FAIL, payload: error});
  }
}

function* forgotPasswordSaga(action: Action<ForgotPasswordRequest>) {
  try {
    const payload = yield call(Api, action, true);

    yield put({type: FORGOT_PASSWORD_SUCCESS, payload});

    NavigationService.navigate('ForgotPasswordSuccess');
  } catch (e) {
    let error = e;

    if (e.length > 0) {
      error = e[0];
    }

    yield put({type: FORGOT_PASSWORD_FAILURE, payload: error});
  }
}

function* sendVerificationCodeSaga(action: Action<any>) {
  try {
    const payload = yield call(Api, action, true);

    const data: SendVerificationCodeSignupResponse = payload.data;

    if (data.codeSent) {
      NavigationService.navigate('Code');
    }

    yield put({
      type: SEND_VERIFICATION_CODE_SIGNUP_SUCCESS,
      payload,
    });
  } catch (e) {
    yield put({type: SEND_VERIFICATION_CODE_SIGNUP_FAIL, payload: e});
  }
}

function* updateHeartsSaga(action: Action<any> | ActionAnyPayload<any>) {
  try {
    const currentHearts = action.payload;

    if (currentHearts === 0) {
      Alert.alert('Game Over!', getRandomGameOverPhrase());
      NavigationService.navigate('Login');
      yield put({type: UPDATE_HEARTS, payload: 4});
    }
  } catch (e) {}
}

function* validateVerificationCodeSaga(action: Action<any>) {
  try {
    const payload = yield call(Api, action, true);

    const data: ValidateVerificationCodeResponse = payload.data;

    if (data.success) {
      NavigationService.navigate('PhoneVerified');
    }

    yield put({
      type: VALIDATE_VERIFICATION_CODE_SUCCESS,
      payload,
    });
  } catch (e) {
    yield put({type: VALIDATE_VERIFICATION_CODE_FAIL, payload: e});
  }
}

export default [
  takeLatest(CREATE_USER, createUserSaga),
  takeLatest(SEND_VERIFICATION_CODE_SIGNUP, sendVerificationCodeSaga),
  takeLatest(UPDATE_HEARTS, updateHeartsSaga),
  takeLatest(VALIDATE_VERIFICATION_CODE, validateVerificationCodeSaga),
  takeLatest(FORGOT_PASSWORD, forgotPasswordSaga),
];
