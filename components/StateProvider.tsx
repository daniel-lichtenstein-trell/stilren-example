import { List, Record, RecordOf, Map } from "immutable";
import React from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

export type ComponentModel = {
  name: string;
  location: string;
  attributes: Map<string, string>;
};

export type AppStateFields = {
  name: string;
  age: number;
  components: List<ComponentModel>;
  asyncData?: Map<string, string>;
};

export type AppState = RecordOf<AppStateFields>;

export const makeAppState = Record<AppStateFields>({
  name: "",
  age: 0,
  components: List(),
  asyncData: undefined,
});

export type StateUpdateFunction = (
  state: AppState | ((oldState: AppState) => AppState)
) => AppState;

export type AppContext = {
  state$: BehaviorSubject<AppState>;
  updateState: StateUpdateFunction;
};

function createContext() {
  const state$ = new BehaviorSubject(makeAppState());
  const updateState: StateUpdateFunction = (input) => {
    const next = typeof input === "function" ? input(state$.value) : input;
    if (state$.value !== next) {
      state$.next(next);
    }
    return next;
  };
  return {
    state$,
    updateState,
  };
}

export const context = React.createContext<AppContext>(createContext());

export function useAppState<T>(
  selector: (state: AppState) => T,
  dependencies: unknown[]
) {
  const { state$ } = React.useContext(context);
  const callback = React.useCallback(selector, dependencies);
  const [state, setState] = React.useState<T>(selector(state$.value));
  React.useEffect(() => {
    const sub = state$
      .pipe(map(callback), distinctUntilChanged())
      .subscribe(setState);
    return () => sub.unsubscribe();
  }, [state$, callback]);
  return state;
}

export function useAppState$<T>(
  mapFn: (state$: Observable<AppState>) => Observable<T>,
  dependencies: unknown[]
) {
  const { state$ } = React.useContext(context);
  const callback = React.useCallback(mapFn, dependencies);
  const [state, setState] = React.useState<T>();
  React.useEffect(() => {
    const sub = callback(state$).subscribe(setState);
    return () => sub.unsubscribe();
  }, [state$, callback]);
  return state;
}

export function useUpdateState() {
  const { updateState } = React.useContext(context);
  return updateState;
}
