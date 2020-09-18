import { ChangeEvent, FormEvent, memo, useCallback } from "react";
import {
  useAppState,
  useAppState$,
  useUpdateState,
} from "../components/StateProvider";
import { loadAsyncData } from "../utils/api";
import { map, distinctUntilChanged, debounceTime } from "rxjs/operators";

const ShowAsyncData = memo(() => {
  const data = useAppState((state) => state.asyncData, []);
  console.log("This is only rerendered when that asyncData is changed");
  if (!data) {
    return <p>There is no async data</p>;
  }
  return <pre>{JSON.stringify(data.toJS(), null, "  ")}</pre>;
});

const ShowDebouncedValues = memo(() => {
  const data = useAppState$(
    (obs) =>
      obs.pipe(
        map((state) => state.name),
        distinctUntilChanged(),
        debounceTime(500)
      ),
    []
  );
  console.log("This is updated with debounced subscription");
  return <div>The debounced value is: "{data}"</div>;
});

function NameForm() {
  const name = useAppState((state) => state.name, []);
  const updateState = useUpdateState();
  const updateName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateState((oldState) => {
        return oldState.set("name", e.target.value);
      });
    },
    [updateState]
  );
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);
  const loadAsync = useCallback(() => {
    loadAsyncData(updateState);
  }, [updateState]);
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Update name:
          <input type="text" name="name" value={name} onChange={updateName} />
        </label>
      </div>
      <div $marginTop="2em">
        <button onClick={loadAsync}>Load async data</button>
        <ShowAsyncData />
      </div>
      <div $marginTop="2em">
        <ShowDebouncedValues />
      </div>
    </form>
  );
}

export default function Generator() {
  return (
    <div $position="absolute" $height="100%" $width="100%" $top="0" $bottom="0">
      <div $maxWidth="66%" $margin="2em auto" $background="white">
        <NameForm />
      </div>
    </div>
  );
}
