import { FC } from "react";

type Props = {
    children: React.ReactNode;
}

export const ListItem: FC<Props> = ({children}) => {
    return (
        <div className="w-48 p-2 rounded-md bg-blue-500 text-white shadow-md">{children}</div>
    )
}
