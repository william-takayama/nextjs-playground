import {
  AnimatePresence,
  m,
  LazyMotion,
  domAnimation,
  Variant,
  Variants,
} from "framer-motion";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import classes from "./Header.module.scss";

interface Props {
  onClick: () => void;
  isOpen?: boolean;
}

const links = [
  { redirect: "/", text: "Home", color: "var(--color-contrast)" },
  { redirect: "/orders", text: "Orders", color: "var(--color-xxx-contrast)" },
  {
    redirect: "/features/lazyload",
    text: "Lazyload",
    color: "var(--color-xxxx-contrast)",
  },
];

const buttonVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.25,
    type: "spring",
    damping: 10,
  },
} as Variant;

const menuVariants = {
  open: { opacity: 1, x: 0, y: 0 },
  close: { opacity: 0, x: "-100%", y: "-100%" },
} as Variant;

function Toggle({ onClick, isOpen }: Props) {
  return (
    <div className={classes.button} onClick={onClick}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} custom={isOpen} exitBeforeEnter={true}>
          <m.div key={String(isOpen)} {...(buttonVariants as Variants)}>
            {isOpen ? <FiX size={20} /> : <FiMenu size={16} />}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

function Items({ onClick }: Props) {
  return (
    <ol className={classes.list}>
      {links.map((item) => (
        <Link key={item.redirect} href={item.redirect}>
          <a>
            <LazyMotion features={domAnimation}>
              <m.li
                onClick={onClick}
                whileHover={{ scale: 1.1, filter: "hue()" }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: item.color }}
              >
                <p className={classes.link}>{item.text}</p>
              </m.li>
            </LazyMotion>
          </a>
        </Link>
      ))}
    </ol>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <header className={classes.header}>
      <Toggle onClick={toggle} isOpen={isOpen} />
      <LazyMotion features={domAnimation}>
        <m.nav
          className={classes.navbar}
          initial={{ opacity: 0, x: "-100%", y: "-100%" }}
          transition={{ type: "spring", bounce: 0, damping: 30 }}
          animate={isOpen ? "open" : "close"}
          variants={menuVariants as Variants}
        >
          <Items onClick={toggle} />
        </m.nav>
      </LazyMotion>
    </header>
  );
}
