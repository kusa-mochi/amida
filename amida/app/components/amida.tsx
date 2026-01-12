"use client";

import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { GoalsContext } from "../page";
import { AmidaPart, GetAmidaPattern } from "../funcs/utils";
import { ListItem } from "./listItem";

type Props = {
  gotoInit?: () => void;
}

export const Amida: FC<Props> = ({ gotoInit }) => {
  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) return null;
  const { goals, setGoals } = goalsContext;

  const [nRows, setNRows] = useState(15);
  const [pattern, setPattern] = useState<AmidaPart[][]>([]);
  
  useEffect(() => {
    const p = GetAmidaPattern(goals.length, nRows);
    setPattern(p);
    console.log(p);
  }, [goals]);

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

  const startAmida = (startIndex: number) => {
    console.log("Start Amida: ", startIndex);
    
  }

  return (
    <div>
      <div className={`grid grid-cols-${goals.length} gap-0 mb-4`}>
        {// goals.lengthの数だけテキスト入力用のinput要素を並べる
          goals.map((_, index) => (
            <div key={index} className="w-24"><input type="text" defaultValue={""} className="w-24" /></div>
          ))
        }
        {// goals.lengthの数だけくじ引き開始のボタンを並べる
          goals.map((_, index) => (
            <div key={index} className="w-24 text-center"><button onClick={() => startAmida(index)}>Start</button></div>
          ))
        }
      </div>
      <div className={`grid grid-cols-${goals.length} gap-0`}>
        {
          pattern.map((row, rIndex) => (
            row.map((part, cIndex) => (
              <Image key={`${rIndex}-${cIndex}`} width={100} height={50} src={amidaPartToImageSrc(part)} alt="ababa" />
            ))
          ))
        }
      </div>
      <div className={`grid grid-cols-${goals.length} gap-0 mb-4`}>
        {goals.map((item, index) => (
          <div key={index} className="w-24">{item}</div>
        ))}
      </div>
      <button onClick={gotoInit}>Go to Init</button>
    </div>
  );
};
