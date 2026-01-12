import Image from "next/image";
import { FC } from "react";

type Props = {
    onClick?: () => void;
}

export const AddButton: FC<Props> = ({ onClick }) => {
    return (
        <button className="p-2 rounded-md bg-blue-200 shadow-md" onClick={onClick}><Image src="add.svg" alt="Add" width={24} height={24} /></button>
    )
}
