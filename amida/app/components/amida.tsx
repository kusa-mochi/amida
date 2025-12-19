"use client";

import Image from "next/image";
import { FC, useState } from "react";

type Props = {
  gotoInit?: () => void;
}

export const Amida: FC<Props> = ({ gotoInit }) => {
  const [nCols, setNCols] = useState(5);
  const [nRows, setNRows] = useState(25);
  return (
    <div className={`grid grid-cols-${nCols} gap-0`}>
      <Image src="u_to_b.svg" alt="ababa" />
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
      <Image src="u_to_b.svg" alt="ababa" />
      <button onClick={gotoInit}>Go to Init</button>
    </div>
  );
};
