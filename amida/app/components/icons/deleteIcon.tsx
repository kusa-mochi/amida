import { FC } from "react";

type Props = {
    disabled?: boolean;
    onClick?: () => void;
}

export const DeleteIcon: FC<Props> = ({ disabled, onClick }) => {
    return (
        <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" className={`w-4 h-4 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} xmlSpace="preserve" onClick={onClick}>
            <g>
                <polygon className="fill-[#4B4B4B]" points="512,52.535 459.467,0.002 256.002,203.462 52.538,0.002 0,52.535 203.47,256.005 0,459.465 52.533,511.998 256.002,308.527 459.467,511.998 512,459.475 308.536,256.005"></polygon>
            </g>
        </svg>
    )
}
