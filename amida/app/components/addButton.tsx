import Image from "next/image";
import { FC } from "react";

type Props = {
    disabled?: boolean;
    onClick?: () => void;
}

export const AddButton: FC<Props> = ({ disabled, onClick }) => {
    return (
        <button className={`p-2 rounded-md ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-200 shadow-md hover:bg-blue-300'}`} onClick={onClick} disabled={disabled}><Image src="add.svg" alt="Add" width={24} height={24} /></button>
    )
}
