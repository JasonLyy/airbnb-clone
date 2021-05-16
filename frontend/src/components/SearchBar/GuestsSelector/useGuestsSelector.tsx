import { Dispatch, useMemo, useReducer } from "react";

export enum InfantsAction {
  Increment = "INCREMENT_INFANTS",
  Decrement = "DECREMENT_INFANTS",
}

export enum ChildrenAction {
  Increment = "INCREMENT_CHILDREN",
  Decrement = "DECREMENT_CHILDREN",
}

export enum AdultsAction {
  Increment = "INCREMENT_ADULTS",
  Decrement = "DECREMENT_ADULTS",
}

export type Actions = InfantsAction | ChildrenAction | AdultsAction;
type ReducerAction = {
  type: Actions;
};

const isAdultsAction = (action: Actions): action is AdultsAction => {
  const actionsArray: Actions[] = Object.values(AdultsAction);
  return actionsArray.includes(action);
};

const isChildrenAction = (action: Actions): action is ChildrenAction => {
  const actionsArray: Actions[] = Object.values(ChildrenAction);
  return actionsArray.includes(action);
};

const isInfantsAction = (action: Actions): action is InfantsAction => {
  const actionsArray: Actions[] = Object.values(InfantsAction);
  return actionsArray.includes(action);
};

export type GuestsState = {
  infants: number;
  children: number;
  adults: number;
};

const initialGuestsState: GuestsState = {
  infants: 0,
  children: 0,
  adults: 0,
};

const guestsSelectorReducer = (
  state: GuestsState,
  action: ReducerAction
): GuestsState => {
  const { type } = action;

  switch (type) {
    case InfantsAction.Decrement:
      return {
        ...state,
        infants: state.infants - 1,
      };
    case InfantsAction.Increment:
      return {
        ...state,
        infants: state.infants + 1,
      };

    case ChildrenAction.Decrement:
      return {
        ...state,
        children: state.children - 1,
      };
    case ChildrenAction.Increment:
      return {
        ...state,
        children: state.children + 1,
      };
    case AdultsAction.Decrement:
      return {
        ...state,
        adults: state.adults - 1,
      };
    case AdultsAction.Increment:
      return {
        ...state,
        adults: state.adults + 1,
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

const useGuestsSelector = (
  maxGuests: GuestsState
): [GuestsState, Dispatch<ReducerAction>, (action: Actions) => boolean] => {
  const [state, dispatch] = useReducer(
    guestsSelectorReducer,
    initialGuestsState
  );

  // todo: ughhhh gave up but lets add some type safety to check the actions...
  // possibly don't go down Enum route?
  const canUpdateGuestsValue = (action: Actions) => {
    if (isAdultsAction(action)) {
      return action.startsWith("INCREMENT")
        ? state.adults + 1 <= maxGuests.adults
        : state.adults - 1 >= initialGuestsState.adults;
    }

    if (isChildrenAction(action)) {
      return action.startsWith("INCREMENT")
        ? state.children + 1 <= maxGuests.children
        : state.children - 1 >= initialGuestsState.children;
    }

    if (isInfantsAction(action)) {
      return action.startsWith("INCREMENT")
        ? state.infants + 1 <= maxGuests.infants
        : state.infants - 1 >= initialGuestsState.infants;
    }

    return false;
  };

  return useMemo(() => [state, dispatch, canUpdateGuestsValue], [state]);
};

export default useGuestsSelector;
