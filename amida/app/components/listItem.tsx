"use client";

import { FC } from "react";

type Props = {
    label: string;
    onChange?: (newValue: string) => void;
}

export const ListItem: FC<Props> = ({label, onChange}) => {
    return (
        <div className="w-48 p-2 rounded-md shadow-md">
            <input type="text" defaultValue={label} className="w-full outline-none" onChange={(e) => onChange?.(e.target.value, )} />
        </div>
    )
}
