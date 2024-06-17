import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {FooterView, NoMoreItemView, useTheme} from 'presentation/presentation';
import {VoidCallback} from 'shared/shared';

interface Props<T> {
  itemList: T[];
  itemListState: T[];
  renderItem: ({item, index}: {item: T; index: number}) => JSX.Element;
  refreshing: boolean;
  onRefresh: VoidCallback;
  onLoadmore: VoidCallback;
}

export const CommonFlashList = <T,>({
  itemList,
  itemListState,
  renderItem,
  refreshing,
  onRefresh,
  onLoadmore,
}: Props<T>): JSX.Element => {
  const theme = useTheme();

  return itemList.length === 0 ? (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          progressBackgroundColor={theme.getTheme.colorScheme.background}
          colors={[theme.getTheme.progressIndicatorTheme.color]}
        />
      }
    />
  ) : (
    <FlashList
      data={itemList}
      extraData={itemList}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={
        itemList.length > 0 ? (
          itemListState ? (
            <FooterView />
          ) : (
            <NoMoreItemView isRetry={true} onRetry={onLoadmore} />
          )
        ) : null
      }
      ListEmptyComponent={<NoMoreItemView />}
      refreshControl={
        itemList.length > 0 ? (
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            progressBackgroundColor={theme.getTheme.colorScheme.background}
            colors={[theme.getTheme.progressIndicatorTheme.color]}
          />
        ) : undefined
      }
      onEndReached={onLoadmore}
      onEndReachedThreshold={0.1}
      estimatedItemSize={(200).rps}
      removeClippedSubviews={true}
    />
  );
};
