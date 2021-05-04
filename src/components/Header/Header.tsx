import classes from "./Header.module.scss";

export default function Header(): JSX.Element {
  return (
    <header className={classes.container}>
      <p className={classes.title}>This is a Header</p>
    </header>
  );
}
