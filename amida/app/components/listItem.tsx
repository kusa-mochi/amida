import { FC } from "react";

type Props = {
    text: string;
}

export const ListItem: FC<Props> = ({text}) => {
    return (
        <div>{text}</div>
    )
}
