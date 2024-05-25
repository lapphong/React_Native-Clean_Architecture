import {singleton} from 'tsyringe';
import NetInfo from '@react-native-community/netinfo';
import {Observable, map} from 'rxjs';

@singleton()
export class ConnectivityHelper {
  get isNetworkAvailable(): Promise<boolean> {
    return NetInfo.fetch().then(state => state.isConnected ?? false);
  }

  get onConnectivityChanged(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const unsubscribe = NetInfo.addEventListener(state => {
        observer.next(state.isConnected ?? false);
      });
      return () => {
        unsubscribe();
      };
    }).pipe(map(value => value));
  }
}
