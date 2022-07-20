import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handleValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handleValue];
};
