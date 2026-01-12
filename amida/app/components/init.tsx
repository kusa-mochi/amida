"use client";

import { FC, useContext, useEffect } from "react";
import { GoalsContext } from "../page";
import { ListItem } from "./listItem";
import { AddButton } from "./addButton";

type Props = {
  gotoAmida?: () => void;
}

export const Init: FC<Props> = ({ gotoAmida }) => {
  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) return null;
  const { goals, setGoals } = goalsContext;

  const addItem = () => {
    // goalsの末尾に空文字列の要素を1つ追加する。
    setGoals([...goals, ""]);
  }

  const changeItem = (newValue: string, index: number) => {
    const newGoals = [...goals];
    newGoals[index] = newValue;
    setGoals(newGoals);
  }

  return (
    <div>
      <div>AMIDA</div>
      <div className="flex flex-col flex-nowrap justify-start items-center">
        {goals.map((item, index) => (
          <div key={index} className="m-1">
            <ListItem label={item} onChange={(newValue) => changeItem(newValue, index)}></ListItem>
          </div>
        ))}
        <div className="m-1"><AddButton onClick={addItem} /></div>
      </div>
      <button onClick={gotoAmida}>Start</button>
    </div>
  )
}
