import { FC } from "react";
import classNames from "classnames";

import { ButtonProps, ButtonType } from "./types";

export const Button: FC<ButtonProps> = ({
    children,
    variant,
    image,
    className,
    active = false,
    ...props
}) => {
    if (image) {
        return (
            <button className="flex h-10" {...props}>
                {image}
                <span className="h-full flex items-center px-2 border border-gray-300 hover:bg-slate-100 rounded-r-md ">
                    {children}
                </span>
            </button>
        );
    }

    const newClassName = classNames({
        "py-2 px-3.5 border border-gray-300 rounded-md hover:bg-slate-100":
            variant === ButtonType.TERTIARY,
        "outline-none border-none hover:text-black whitespace-nowrap":
            variant === ButtonType.LINK,
        "text-black": variant === ButtonType.LINK && active,
        "text-gray-500": variant === ButtonType.LINK && !active
    });

    return (
        <button className={[newClassName, className].join(" ")} {...props}>
            {children}
        </button>
    );
};
