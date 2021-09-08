import { useState, useCallback } from "react";

export default (initValue = null) => {
  const [value, setValue, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setValue];
};
