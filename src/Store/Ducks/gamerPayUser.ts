import { GamerPayUser } from "src/Models/GamerPayUser";

export const SET_USER_GP_DATA = 'SET_USER_GP_DATA';

export interface SetGPUser {
    type: typeof SET_USER_GP_DATA;
    payload: {data: {GPUser: GamerPayUser}};
}

export type Actions =
  | SetGPUser

export interface State {
    GPUser: GamerPayUser;
}

const initialState: State = {

    GPUser: {
        nickName: '',
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        cpf:  '',
        cep: '',
        enderecoRua: '',
        enderecoNumero: '',
        enderecoCidade: '',
        enderecoEstado: '',
        enderecoComplemento: '',
        corCartao: ''
    }

}

export default function reducer(state = initialState, action: Actions): State {
    switch (action.type) {
  
      case SET_USER_GP_DATA: {
        return {
          ...state,
          GPUser: action.payload.data.GPUser,
        };
      }
  
      default:
        return state;
    }
}

export function setGPUser(GPUser: GamerPayUser): SetGPUser {
    return {
      type: SET_USER_GP_DATA,
      payload: {
        data: { GPUser },
      },
    };
  }