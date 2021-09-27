import {MyOrderSummaryAddressInfo} from 'src/Models/MyOrder';
import {SellerMyOrderAddressInfo} from 'src/Models/SellerOrder';

export const formatAddressMyOrder = (
  address: MyOrderSummaryAddressInfo | undefined,
): string => {
  if (!address) {
    return '';
  }

  const {city, complement, number, state, street} = address;

  return `${street} ${number}, ${
    complement ? `, ${complement}` : ''
  }, ${city} - ${state}`;
};

export const formatAddressStoreMyOrder = (
  address: SellerMyOrderAddressInfo | undefined,
): string => {
  if (!address) {
    return '';
  }

  const {city, complement, number, state, street} = address;

  return `${street} ${number}, ${
    complement ? `, ${complement}` : ''
  }, ${city} - ${state}`;
};
