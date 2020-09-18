import { fromJS, Map } from "immutable";
import { StateUpdateFunction } from "../components/StateProvider";

async function _loadAsyncData(): Promise<Map<string, string>> {
  return new Promise((res) => {
    setTimeout(() => {
      res(
        fromJS({
          keyworld: "value",
          key: "42",
          data: "another value",
        })
      );
    }, 899);
  });
}

export async function loadAsyncData(
  update: StateUpdateFunction
): Promise<void> {
  const data = await _loadAsyncData();
  update((state) => state.set("asyncData", data));
}
