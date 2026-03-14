import type { ReactElement } from "react";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement[];
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.root}>
      <div className={classes.body}>{...children}</div>
    </div>
  );
};
