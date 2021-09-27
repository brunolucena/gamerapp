export const regexCelularETelefone = /^(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/;
export const regexCelular = /^(?:\()[0-9]{2}(?:\))\s?[0-9]{5}(?:-)[0-9]{4}$/;
export const regexCpfCnpj = /^([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$/;
export const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const regexPhone = /^(?:\()[0-9]{2}(?:\))\s?[0-9]{4}(?:-)[0-9]{4}$/;
export const regexTwoWords = /(\w.+\s).+/i;
export const regexZipCode = /[0-9]{5}-[0-9]{3}/g;
