"use client";

import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { GoalsContext } from "../page";
import { AmidaPart, GetAmidaPattern } from "../funcs/utils";
import { ListItem } from "./listItem";
import next from "next";
import { GoButton } from "./goButton";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const [nRows, setNRows] = useState(15);
  const [pattern, setPattern] = useState<AmidaPart[][]>([]);
  const [goalVisibilities, setGoalVisibilities] = useState<boolean[]>([]);

  useEffect(() => {
    const p = GetAmidaPattern(goals.length, nRows);
    setPattern(p);
    console.log(p);
    setGoalVisibilities(new Array(goals.length).fill(false));
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
    let stopLoop: boolean = false;

    const ifAmidaFin = (): boolean => {
      return (currentRow >= nRows && currentDirection === Direction.Down);
    }

    // patternの太線部分をリセットしたものをnextPatternにコピー
    for (let r = 0; r < pattern.length; r++) {
      nextPattern[r] = [];
      for (let c = 0; c < pattern[r].length; c++) {
        switch (pattern[r][c]) {
          case AmidaPart.BOLD_U_TO_B:
            nextPattern[r][c] = AmidaPart.U_TO_B;
            break;
          case AmidaPart.U_TO_B_BOLD_B_TO_L:
            nextPattern[r][c] = AmidaPart.U_TO_BL;
            break;
          case AmidaPart.U_TO_B_BOLD_L_TO_U:
            nextPattern[r][c] = AmidaPart.U_TO_BL;
            break;
          case AmidaPart.U_TO_B_BOLD_R_TO_B:
            nextPattern[r][c] = AmidaPart.U_TO_RB;
            break;
          case AmidaPart.U_TO_B_BOLD_U_TO_R:
            nextPattern[r][c] = AmidaPart.U_TO_RB;
            break;
          default:
            nextPattern[r][c] = pattern[r][c];
            break;
        }
      }
    }

    while (!ifAmidaFin() && !stopLoop) {
      const currentPart = nextPattern[currentRow][currentCol];

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
              stopLoop = true;
              break;
            case AmidaPart.U_TO_BL:
              console.error("invalid state: left input direction to U_TO_BL");
              stopLoop = true;
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
              stopLoop = true;
              break;
            case AmidaPart.U_TO_BL:
              nextPattern[currentRow][currentCol] = AmidaPart.U_TO_B_BOLD_B_TO_L;
              currentDirection = Direction.Down;
              break;
            case AmidaPart.U_TO_RB:
              console.error("invalid state: right input direction to U_TO_RB");
              stopLoop = true;
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

    const newVisibilities = new Array(goals.length).fill(false);
    newVisibilities[currentCol] = true;
    setGoalVisibilities(newVisibilities);
  }

  return (
    <div>
      <div className="text-center mb-4">{t("selectOne")}</div>
      <div className={`grid grid-cols-${goals.length} gap-0 mb-4`}>
        {// goals.lengthの数だけテキスト入力用のinput要素を並べる
          goals.map((_, index) => (
            <div key={index} className="w-24"><input type="text" defaultValue={""} placeholder={t("yourName")} className="w-24 p-1 outline-[#169632] outline-offset-2 not-fucus:outline-hidden focus:outline-[2px] border border-gray-300 rounded-md text-center" /></div>
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
          <div key={item.id} className={`w-24 text-center ${goalVisibilities[index] ? 'visible' : 'invisible'}`}>{item.value}</div>
        ))}
      </div>
      <GoButton onClick={gotoInit}>{t("back")}</GoButton>
    </div>
  );
};
