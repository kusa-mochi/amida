import { FC, ReactNode } from "react";

type Props = {
    children?: ReactNode;
    onClick?: () => void;
}

export const GoButton: FC<Props> = ({ children, onClick }) => {
    return (
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white shadow-md hover:bg-blue-600" onClick={onClick}>{children}</button>
    )
}
