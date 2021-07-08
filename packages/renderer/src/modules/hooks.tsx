import React, { useEffect, useRef, useState } from "react";

export function useClientHeight<T extends Element>(): [
  React.RefObject<T>,
  number | undefined
] {
  const panelRef = useRef<T>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (panelRef.current) {
      const resizeObserver = new ResizeObserver((entries) =>
        setHeight(entries[0].target.clientHeight)
      );

      resizeObserver.observe(panelRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [panelRef]);

  return [panelRef, height];
}
