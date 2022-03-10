export enum ActionKind {
  INC = 'INC',
  DEC = 'DEC',
  UPDT = 'UPDT',
}

interface CountAction {
  type: string;
  payload: 'Nyan Catrometer' | 'Choqueflix';
}

interface CountState {
  'Nyan Catrometer': number,
  'Choqueflix': number,
}

export default function counterReducer(state: CountState, action: CountAction) {
  const { type, payload } = action;
  console.log({ state });

  switch (type) {
    case 'INC':
      return {
        ...state,
        [payload]: state[payload] + 1,
      };
    case ActionKind.DEC:
      return {
        ...state,
        [payload]: state[payload] - 1,
      };
      case ActionKind.UPDT:
        return {
          payload,
        };
    default:
      return state;
  }
}
