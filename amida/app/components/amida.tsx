"use client";

import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { GoalsContext } from "../page";
import { AmidaPart, GetAmidaPattern } from "../funcs/utils";

type Props = {
  gotoInit?: () => void;
}

export const Amida: FC<Props> = ({ gotoInit }) => {
  const goals = useContext(GoalsContext);
  const [nCols, setNCols] = useState(5);
  const [nRows, setNRows] = useState(15);
  const [pattern, setPattern] = useState<AmidaPart[][]>([]);
  
  useEffect(() => {
    const p = GetAmidaPattern(nCols, nRows);
    setPattern(p);
    console.log(p);
  }, [nCols, nRows]);

  const amidaPartToImageSrc = (part: AmidaPart): string => {
    switch (part) {
      case AmidaPart.U_TO_B:
        return "u_to_b.svg";
      case AmidaPart.U_TO_BL:
        return "u_to_bl.svg";
      case AmidaPart.U_TO_RB:
        return "u_to_rb.svg";
      default: // TODO
        return "u_to_b.svg";
    }
  }

  return (
    <div>
      <div className={`grid grid-cols-${nCols} gap-0 mb-4`}>
        {goals.map((item, index) => (
          <div key={index} className="w-24">{item}</div>
        ))}
      </div>
      <div className={`grid grid-cols-${nCols} gap-0`}>
        {
          pattern.map((row, rIndex) => (
            row.map((part, cIndex) => (
              <Image key={`${rIndex}-${cIndex}`} width={100} height={50} src={amidaPartToImageSrc(part)} alt="ababa" />
            ))
          ))
        }
        {/* <Image src="u_to_b.svg" alt="ababa" />
        <Image src="bold_u_to_b.svg" alt="ababa" />
        <Image src="u_to_b.svg" alt="ababa" />
        <Image src="u_to_b.svg" alt="ababa" />
        <Image src="u_to_b.svg" alt="ababa" />

        <Image src="u_to_b_bold_r_to_b.svg" alt="ababa" />
        <Image src="u_to_b_bold_l_to_u.svg" alt="ababa" />
        <Image src="u_to_rb.svg" alt="ababa" />
        <Image src="u_to_bl.svg" alt="ababa" />
        <Image src="u_to_b.svg" alt="ababa" />

        <Image src="bold_u_to_b.svg" alt="ababa" />
        <Image src="u_to_rb.svg" alt="ababa" />
        <Image src="u_to_bl.svg" alt="ababa" />
        <Image src="u_to_b.svg" alt="ababa" />
        <Image src="u_to_b.svg" alt="ababa" /> */}
        <button onClick={gotoInit}>Go to Init</button>
      </div>
    </div>
  );
};
