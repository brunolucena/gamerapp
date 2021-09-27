import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

interface Props {
  columns?: number;
  data: readonly any[] | null | undefined;
  gap?: number,
  keyExtractor?: ((item: any, index: number) => string) | undefined;
  listHeaderComponent?: any;
  renderItem: (item: any | null | undefined) => any;
}

const Grid: React.FC<Props> = ({columns = 2, data, gap = 0, keyExtractor, listHeaderComponent, renderItem}) => {
  const gridKeyExtractor = (item: any, index: number) => {
    return item.id || index;
  }

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        data={createRows(data, columns = 2, gap)}
        keyExtractor={keyExtractor || gridKeyExtractor}
        numColumns={columns}
        renderItem={({item}) => {
          if (item.empty) {
            return <View style={[styles.item, styles.itemEmpty]} />;
          }
          
          return (
          <View style={[styles.item, { marginBottom: gap }, item.shouldHasGap && { marginLeft: gap }]}>
            {renderItem(item)}
          </View>
        )}}
      />
    </SafeAreaView>
  );
};

function createRows(data: any, columns: number, gap = 0) {
  const rows = Math.floor(data.length / columns);
  let lastRowElements = data.length - rows * columns;

  while (lastRowElements !== columns) {
    data.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true,
    });
    lastRowElements += 1;
  }

  if (columns > 1 && gap > 0) {
    data = data.map((d: any, index: number) => {
      const row = index % columns;

      if (row > 0) {
        d.shouldHasGap = true;
      }

      return d;
    });
  }

  return data;
}

const styles = StyleSheet.create({
  item: {
    flexBasis: 0,
    flexGrow: 1,
  },
  itemEmpty: {
    backgroundColor: 'transparent',
  },
  listHeaderComponentStyle: {
    marginBottom: 25,
  },
  text: {
    color: '#333333',
  },
});

export default Grid;
