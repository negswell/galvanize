import React, { PropsWithChildren } from "react";

export enum ButtonType {
  LINK = "LINK",
  TERTIARY = "TERTIARY",
}

export interface ButtonProps
  extends PropsWithChildren,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  variant?: ButtonType;
  image?: JSX.Element;
  active?: boolean;
}
