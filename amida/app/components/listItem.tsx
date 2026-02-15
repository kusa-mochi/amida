"use client";

import { FC } from "react";
import { DeleteIcon } from "./icons/deleteIcon";
import { useTranslation } from "react-i18next";

type Props = {
    label: string;
    canDelete?: boolean;
    onChange?: (newValue: string) => void;
    onDelete?: () => void;
}

export const ListItem: FC<Props> = ({ label, canDelete, onChange, onDelete }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-row flex-nowrap justify-start items-center">
            <input type="text" defaultValue={label} className="w-full mr-2 p-1 outline-[#169632] outline-offset-2 not-fucus:outline-hidden focus:outline-[2px] border border-gray-300 rounded-md" placeholder={t("itemPlaceholder")} onChange={(e) => onChange?.(e.target.value)} />
            <DeleteIcon disabled={!canDelete} onClick={canDelete ? onDelete : undefined} />
        </div>
    )
}
