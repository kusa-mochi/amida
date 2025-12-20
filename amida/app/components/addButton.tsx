import Image from "next/image";
import { FC } from "react";

export const AddButton: FC = () => {
    return (
        <button className="p-2 rounded-md bg-blue-200 shadow-md"><Image src="add.svg" alt="Add" width={24} height={24} /></button>
    )
}
