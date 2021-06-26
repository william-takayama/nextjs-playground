import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Transition,
  Variant,
  Variants,
} from "framer-motion";
import { CSSProperties, FunctionComponent } from "react";

/** This is a HOC that is already optimized using framer-motion library best practices on performance
 *
 * @param Component component to be wrapped by optimized animation
 * @param name It's the name of the component on React tree
 * @param animation Whether you desire to overwrite the current animation
 * @param containerStyle Allows you to overwrite the container style with your own style
 */
export function withOptimizedAnimation<P>(
  Component: FunctionComponent<P>,
  name: string,
  animation?: Record<string, Variant & Transition>,
  containerStyle?: CSSProperties
): FunctionComponent<P> {
  Component.displayName = name;

  return (props) => {
    return (
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            style={{ width: "100%", height: "100%", ...containerStyle }}
            {...animation}
          >
            <Component {...props} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    );
  };
}
