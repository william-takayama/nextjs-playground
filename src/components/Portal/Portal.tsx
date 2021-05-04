import { useState, useRef, useEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  /** ID of the container element (it'll be created if it doesn't exist) */
  id: string;
}

export default function Portal({
  id,
  children,
}: PropsWithChildren<PortalProps>) {
  const [mounted, setMounted] = useState(false);
  const container = useRef<Element | null>(null);

  useEffect(() => {
    let element = document.querySelector(`#${id}`);

    if (element == null) {
      element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    }

    container.current = element;
    setMounted(true);
  }, [id]);

  if (mounted === false || container.current == null) {
    return null;
  }

  return createPortal(children, container.current, id);
}
