/* Máscaras ER */
function mascara(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout('execmascara()', 1);
}

function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}

export function phoneMask(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  phone = phone.replace(/\D/g, ''); //Remove tudo o que não é dígito
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
  phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos

  return phone;
}

export function cepMask(cep: string): string {
  cep = cep.replace(/\D/g, ''); //Remove tudo o que não é dígito
  cep = cep.substring(0, 5) + '-' + cep.substring(5); //Coloca hífen entre o quinto e o sexto dígito

  return cep;
}

export function cpfMask(cpf: string): string {
  cpf = cpf.replace(/\D/g, ''); //Remove tudo o que não é dígito
  cpf = cpf.substring(0, 4) + '.' + cpf.substring(4, 7) + '.' + cpf.substring(7, 10) + '-' + cpf.substring(10, 12);

  return cpf;
}