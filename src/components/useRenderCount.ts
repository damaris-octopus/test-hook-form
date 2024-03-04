import { useRef } from "react";

const useRenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return renderCount.current;
};

export default useRenderCounter;
