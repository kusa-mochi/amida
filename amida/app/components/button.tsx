import { FC } from "react";

type Props = {
    children: React.ReactNode;
}

export const Button: FC<Props> = ({children}) => {
    return (
        <button>{children}</button>
    )
}
