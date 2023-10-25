import { useEffect, useState } from "react";

export function useNomoState(nomoGetterFunction: () => Promise<any>) {
  const [nomoState, setNomoState] = useState<any | null>(null);
  useEffect(() => {
    nomoGetterFunction()
      .then((valueFromNomo) => {
        setNomoState(valueFromNomo);
      })
      .catch((e) => {
        console.error(e);
        setNomoState(e);
      });
  }, [nomoGetterFunction]);
  return nomoState;
}
