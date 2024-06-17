import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList, View, Text} from 'react-native';
import {BaseProviderState, appRedux, notiRedux} from 'app/app';
import {
  CommonFlashList,
  PagingController,
  ShimmerContainerEffect,
  useTheme,
} from 'presentation/presentation';
import {NotiItem} from './components/Noti-Item';
import {AppException, CompleterUtils, DebounceUtils, UiConstants} from 'shared/shared';
import {LoadMoreOutput, Msg} from 'domain/domain';

export const NotiScreen = () => {
  const theme = useTheme();
  const isDarkTheme = useSelector(appRedux.getSelector).isDarkTheme;
  const _pagingController = PagingController.getInstance<Msg>();
  const notiState = useSelector(notiRedux.getSelector);
  const [itemList, setItemList] = useState(_pagingController.getItemList);
  const debounce = DebounceUtils.getInstance();

  // ********************* initState *********************
  const initializer = useRef<boolean>(false);
  const initState = async () => {
    if (!initializer.current) {
      await notiRedux.onNotiPageInitiated();
      initializer.current = true;
    }
  };

  useEffect(() => {
    initState();
  }, []);
  //******************************************************

  const notificationsRef = useRef<LoadMoreOutput<Msg> | null>(null);
  const loadNotiExceptionRef = useRef<AppException | null>(null);

  const multiReduxListener = async () => {
    if (notificationsRef.current !== notiState.notifications && notiState.notifications.data) {
      _pagingController.appendLoadMoreOutput(notiState.notifications);
      notificationsRef.current = notiState.notifications;
    }

    if (loadNotiExceptionRef.current !== notiState.loadNotiException) {
      _pagingController.setError = notiState.loadNotiException!;
      loadNotiExceptionRef.current = notiState.loadNotiException;
    }

    setItemList([..._pagingController.getItemList]);
  };

  useEffect(() => {
    multiReduxListener();
  }, [isDarkTheme, notiState.notifications, notiState.loadNotiException]);

  const renderItem = useCallback(({item, index}: {item: Msg; index: number}) => {
    return (
      <View>
        <Text style={theme.getTheme.textTheme.labelLarge}>{index}</Text>
        <NotiItem key={item.id.toString()} msg={item} />
      </View>
    );
  }, []);

  return (
    <BaseProviderState redux={notiRedux}>
      <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
        <Text style={theme.getTheme.textTheme.labelLarge}>{`Tổng ${itemList.length}`}</Text>
      </View>
      <View style={{flex: 1, paddingHorizontal: 8}}>
        {notiState.isShimmerLoading ? (
          <ListViewLoader />
        ) : (
          <CommonFlashList
            itemList={itemList}
            itemListState={notiState.notifications.data}
            renderItem={renderItem}
            refreshing={notiState.isShimmerLoading}
            onRefresh={async () => {
              const completer = new CompleterUtils<void>();
              await notiRedux.onNotiPageRefreshed(completer);
              return completer.future;
            }}
            onLoadmore={() => debounce.run(async () => await notiRedux.onNotiLoadMore())}
          />
        )}
      </View>
    </BaseProviderState>
  );
};

const ListViewLoader = () => {
  const theme = useTheme();

  return (
    <FlatList
      data={Array.from({length: UiConstants.shimmerItemCount})}
      renderItem={() => (
        <View style={{paddingVertical: 5}}>
          <ShimmerContainerEffect backgroundColor={theme.getTheme.shimmer} />
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};
