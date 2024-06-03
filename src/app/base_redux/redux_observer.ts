import {Middleware} from '@reduxjs/toolkit';
import {Log, LogColor} from 'shared/shared';

const observerMiddleware: Middleware = storeAPI => next => action => {
  Log.d('============== [Redux Observer] ==============', {
    name: 'Redux Observer',
    color: LogColor.puple,
  });
  Log.d(Log.prettyJson(JSON.parse(JSON.stringify(action))), {
    name: 'Dispatching action',
    color: LogColor.puple,
  });
  const result = next(action);
  Log.d(Log.prettyJson(JSON.parse(JSON.stringify(storeAPI.getState()))), {
    name: 'Next state',
    color: LogColor.puple,
  });
  Log.d('==============================================', {
    name: 'Redux Observer',
    color: LogColor.puple,
  });
  return result;
};

export default observerMiddleware;
