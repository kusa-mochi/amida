import { FC } from "react";

type Props = {
    text: string;
}

export const ListItem: FC<Props> = ({text}) => {
    return (
        <div className="w-48 m-2 rounded-md bg-blue-500 text-white shadow-md">{text}</div>
    )
}
