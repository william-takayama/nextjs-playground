import cn from "clsx";
import React, {
  MouseEvent,
  PropsWithChildren,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Portal from "../Portal/Portal";
import classes from "./BottomSheet.module.scss";

export interface BottomSheetProps {
  /**
   * Function to close the Popup
   */
  onDismiss: () => void;
  /**
   * Controls if the Popup is visible or not
   */
  visible: boolean;
  id: string;
  /**
   * Value to determine a limit for the swipe
   *
   * This value is a percentage based on the Popup height, so when the swipe
   * passes this percentage the `onDismiss` function is called
   */
  threshold?: number;
  contentClassName?: string;
}

/**
 * Popup component that shows from the bottom and closes from a swipe
 */
export default function BottomSheet({
  children,
  onDismiss,
  visible,
  threshold = 50,
  id,
  contentClassName,
  ...props
}: PropsWithChildren<BottomSheetProps>) {
  const [dragging, setDragging] = useState(false);
  const [y, setY] = useState(100);
  const container = useRef<HTMLDivElement | null>(null);
  const startY = useRef(0);
  const containerHeight = useRef(0);

  useEffect(() => {
    setY(visible ? 0 : 100);

    if (visible === false) {
      setDragging(false);
    }
  }, [visible]);

  function onStart(
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) {
    setDragging(true);

    const y = "touches" in event ? event.touches[0].clientY : event.clientY;

    startY.current = y;
    containerHeight.current = container.current!.clientHeight;
  }

  function onEnd() {
    setDragging(false);

    if (y > threshold) {
      onDismiss();
    } else {
      setY(0);
    }
  }

  function onMove(
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) {
    if (dragging === false) {
      return;
    }

    let eventY = 0;

    if ("touches" in event) {
      const touch = event.touches[0];

      eventY = touch.clientY;
    } else {
      eventY = event.clientY;
    }

    const diff = eventY - startY.current;

    const y = Math.max(0, Math.round((diff * 100) / containerHeight.current));

    setY(y);
  }

  return (
    <Portal id={id}>
      <div
        className={cn(classes.container, {
          [classes.visible]: visible,
        })}
        style={{
          transform: `translateY(${y}%)`,
          transition: dragging ? "" : `transform .3s ease`,
        }}
        onMouseDown={onStart}
        onTouchStart={onStart}
        onTouchEnd={onEnd}
        onMouseUp={onEnd}
        onTouchMove={onMove}
        onMouseMove={onMove}
        ref={container}
      >
        <div className={classes.close} onClick={onDismiss}>
          {/* <Icon type="close" /> */}
        </div>
        <div className={classes.grabber} />
        <div
          className={cn(classes.content, contentClassName)}
          {...props}
          style={{ paddingBottom: 80 }}
        >
          {visible && children}
        </div>
      </div>

      <div
        className={cn(classes.overlay, {
          [classes.visible]: visible,
        })}
        onClick={onDismiss}
      />
    </Portal>
  );
}
