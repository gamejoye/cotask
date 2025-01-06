import { useEffect, useState } from "react";

export function useLastState<T>(value: T) {
  const [state, setState] = useState<T>(value);
  const [record, setRecord] = useState<[T, T]>([value, value]);
  useEffect(() => {
    setRecord([record[1], state]);
  }, [state]);
  return [state, setState, record[0]] as const;
}