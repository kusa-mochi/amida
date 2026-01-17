"use client";

import { FC, useContext, useEffect } from "react";
import { GoalsContext } from "../page";
import { ListItem } from "./listItem";
import { AddButton } from "./addButton";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  gotoAmida?: () => void;
}

export const Init: FC<Props> = ({ gotoAmida }) => {
  const goalsContext = useContext(GoalsContext);
  if (!goalsContext) return null;
  const { goals, setGoals } = goalsContext;

  const addItem = () => {
    // goalsの末尾に空文字列の要素を1つ追加する。
    setGoals([...goals, { id: uuidv4(), value: "" }]);
  }

  const changeItem = (newValue: string, id: string) => {
    const newGoals = goals.map(goal => goal.id === id ? { ...goal, value: newValue } : goal);
    setGoals(newGoals);
  }

  const deleteItem = (id: string) => {
    const newGoals = goals.filter(goal => goal.id !== id);
    setGoals(newGoals);
  }

  return (
    <div>
      <div>AMIDA</div>
      <div className="flex flex-col flex-nowrap justify-start items-center">
        {goals.map((item) => (
          <div key={item.id} className="m-1">
            <ListItem label={item.value} onChange={(newValue) => changeItem(newValue, item.id)} onDelete={() => deleteItem(item.id)}></ListItem>
          </div>
        ))}
        <div className="m-1"><AddButton onClick={addItem} /></div>
      </div>
      <button onClick={gotoAmida}>Start</button>
    </div>
  )
}
