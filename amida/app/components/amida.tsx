"use client";

import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { GoalsContext } from "../page";
import { AmidaPart, GetAmidaPattern } from "../funcs/utils";
import { ListItem } from "./listItem";
import next from "next";

type Props = {
  gotoInit?: () => void;
}

enum Direction {
  Down = 0,
  Left = 1,
  Right = 2,
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
      case AmidaPart.BOLD_U_TO_B:
        return "bold_u_to_b.svg";
      case AmidaPart.U_TO_B_BOLD_B_TO_L:
        return "u_to_b_bold_b_to_l.svg";
      case AmidaPart.U_TO_B_BOLD_L_TO_U:
        return "u_to_b_bold_l_to_u.svg";
      case AmidaPart.U_TO_B_BOLD_R_TO_B:
        return "u_to_b_bold_r_to_b.svg";
      case AmidaPart.U_TO_B_BOLD_U_TO_R:
        return "u_to_b_bold_u_to_r.svg";
      default: // TODO
        return "u_to_b.svg";
    }
  }

  const startAmida = (startIndex: number) => {
    console.log("Start Amida: ", startIndex);
    let currentRow: number = 0;
    let currentCol: number = startIndex;
    let currentDirection: Direction = Direction.Down;
    const nextPattern: AmidaPart[][] = [];

    const ifAmidaFin = (): boolean => {
      return (currentRow >= nRows && currentDirection === Direction.Down);
    }

    // patternをnextPatternにコピー
    for (let r = 0; r < pattern.length; r++) {
      nextPattern[r] = [];
      for (let c = 0; c < pattern[r].length; c++) {
        nextPattern[r][c] = pattern[r][c];
      }
    }

    while (!ifAmidaFin()) {
      const currentPart = pattern[currentRow][currentCol];

      switch (currentDirection) {
        case Direction.Down:
          switch (currentPart) {
            case AmidaPart.U_TO_B:
              nextPattern[currentRow][currentCol] = AmidaPart.BOLD_U_TO_B;
              break;
            case AmidaPart.U_TO_BL:
              nextPattern[currentRow][currentCol] = AmidaPart.U_TO_B_BOLD_L_TO_U;
              currentDirection = Direction.Left;
              break;
            case AmidaPart.U_TO_RB:
              nextPattern[currentRow][currentCol] = AmidaPart.U_TO_B_BOLD_U_TO_R;
              currentDirection = Direction.Right;
              break;
          }
          break;
        case Direction.Left:
          switch (currentPart) {
            case AmidaPart.U_TO_B:
              console.error("invalid state: left input direction to U_TO_B");
              break;
            case AmidaPart.U_TO_BL:
              console.error("invalid state: left input direction to U_TO_BL");
              break;
            case AmidaPart.U_TO_RB:
              nextPattern[currentRow][currentCol] = AmidaPart.U_TO_B_BOLD_R_TO_B;
              currentDirection = Direction.Down;
              break;
          }
          break;
        case Direction.Right:
          switch (currentPart) {
            case AmidaPart.U_TO_B:
              console.error("invalid state: right input direction to U_TO_B");
              break;
            case AmidaPart.U_TO_BL:
              nextPattern[currentRow][currentCol] = AmidaPart.U_TO_B_BOLD_B_TO_L;
              currentDirection = Direction.Down;
              break;
            case AmidaPart.U_TO_RB:
              console.error("invalid state: right input direction to U_TO_RB");
              break;
          }
          break;
      }

      switch (currentDirection) {
        case Direction.Down:
          currentRow++;
          break;
        case Direction.Left:
          currentCol--;
          break;
        case Direction.Right:
          currentCol++;
          break;
      }
    }

    setPattern(nextPattern);
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
