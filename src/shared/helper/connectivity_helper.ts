import {singleton} from 'tsyringe';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Observable} from 'rxjs';

@singleton()
export class ConnectivityHelper {
  async isNetworkAvailable(): Promise<boolean> {
    const state: NetInfoState = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  onConnectivityChanged(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const unsubscribe = NetInfo.addEventListener(state => {
        observer.next(state.isConnected ?? false);
      });
      return () => {
        unsubscribe();
      };
    });
  }
}
