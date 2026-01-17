"use client";

import { FC } from "react";
import { DeleteIcon } from "./icons/deleteIcon";

type Props = {
    label: string;
    onChange?: (newValue: string) => void;
    onDelete?: () => void;
}

export const ListItem: FC<Props> = ({ label, onChange, onDelete }) => {
    return (
        <div className="flex flex-row flex-nowrap justify-start items-center">
            <div className="w-48 p-2 mr-3 rounded-md shadow-md border border-gray-300">
                <input type="text" defaultValue={label} className="w-full outline-none" onChange={(e) => onChange?.(e.target.value)} />
            </div>
            <DeleteIcon onClick={onDelete} />
        </div>
    )
}
