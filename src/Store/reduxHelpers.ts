import {State as TradeState} from './Ducks/tradeRequestDetails';
import {State as ActiveTradeState} from './Ducks/tradeRequestDetails';

export function tradeHasChanges(
  tradeState: TradeState,
  activeTradeState: ActiveTradeState,
): boolean {
  const {tradeItems, tradeParts} = tradeState;
  const {
    tradeItems: activeTradeItems,
    tradeParts: activeTradeParts,
  } = activeTradeState;

  if (!tradeParts.length || !activeTradeParts.length) {
    return false;
  }

  const tradeItemsSelected = tradeItems.filter(tradeItem => tradeItem.selected);
  const tradeItemsNotSelected = tradeItems.filter(
    tradeItem => !tradeItem.selected,
  );
  const activeTradeItemsSelected = activeTradeItems.filter(
    tradeItem => tradeItem.selected,
  );
  const activeTradeItemsNotSelected = activeTradeItems.filter(
    tradeItem => !tradeItem.selected,
  );

  const check1 = tradeItemsSelected.every(
    tradeItem =>
      activeTradeItemsSelected.findIndex(
        t => t.productCatalogId === tradeItem.productCatalogId,
      ) > -1,
  );
  const check2 = tradeItemsNotSelected.every(
    tradeItem =>
      activeTradeItemsNotSelected.findIndex(
        t => t.productCatalogId === tradeItem.productCatalogId,
      ) > -1,
  );

  if (!check1 || !check2) {
    return true;
  }

  const gamer1 = tradeParts[0];
  const gamer2 = tradeParts[1];

  const activeGamer1 = activeTradeParts.find(
    tradePart => tradePart.gamerId === gamer1.gamerId,
  );
  const activeGamer2 = activeTradeParts.find(
    tradePart => tradePart.gamerId === gamer2.gamerId,
  );

  if (
    gamer1.offeredPrice !== activeGamer1?.offeredPrice ||
    gamer2.offeredPrice !== activeGamer2?.offeredPrice
  ) {
    return true;
  }

  return false;
}

export function tradeIsValid(activeTradeState: ActiveTradeState): boolean {
  const {tradeItems} = activeTradeState;

  if (tradeItems.length > 0) {
    return true;
  }

  return false;
}
