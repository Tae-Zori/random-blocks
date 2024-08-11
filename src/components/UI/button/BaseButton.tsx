import { HTMLAttributes, ReactNode } from "react";
import cl from "./BaseButton.module.scss";
interface BaseButtonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
const BaseButton = ({ children, ...props }: BaseButtonProps) => {
    return (
        <div {...props} className={cl.button}>
            {children}
        </div>
    );
};

export default BaseButton;
