import {Address} from 'src/Models/User';

const formatAddress = (address: Address | undefined): string => {
  if (!address) {
    return '';
  }

  const {localidade, uf, logradouro, numero, bairro, complemento} = address;

  return `${logradouro} ${numero}, ${bairro}${
    complemento ? `, ${complemento}` : ''
  }, ${localidade} - ${uf}`;
};

export default formatAddress;
