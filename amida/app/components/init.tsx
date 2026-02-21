"use client";

import { FC, useContext, useState } from "react";
import { GoalsContext } from "../page";
import { ListItem } from "./listItem";
import { AddButton } from "./addButton";
import { v4 as uuidv4 } from 'uuid';
import { Orbitron } from "next/font/google";
import { GoButton } from "./goButton";
import { useTranslation } from "react-i18next";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  gotoAmida?: () => void;
}

export const Init: FC<Props> = ({ gotoAmida }) => {
  const { t } = useTranslation();
  const goalsContext = useContext(GoalsContext);

  const goals = goalsContext?.goals ?? [];
  const setGoals = goalsContext?.setGoals;
  const [canAdd, setCanAdd] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  // track which item should receive focus after being added
  const [focusId, setFocusId] = useState<string | null>(null);

  if (!goalsContext || !setGoals) return null;

  const addItem = () => {
    // 追加後のgoalsの要素数が10以上となる場合、追加できないようにする。
    if (goals.length >= 9) {
      setCanAdd(false);
    }

    // 追加後のgoalsの要素数が3以上となる場合、削除できるようにする。
    if (goals.length >= 2) {
      setCanDelete(true);
    }

    // 新規IDを生成しておく（あとでfocusIdに設定）
    const newId = uuidv4();
    // goalsの末尾に空文字列の要素を1つ追加する。
    setGoals([...goals, { id: newId, value: "" }]);
    setFocusId(newId);
  }

  const changeItem = (newValue: string, id: string) => {
    const newGoals = goals.map(goal => goal.id === id ? { ...goal, value: newValue } : goal);
    setGoals(newGoals);
  }

  const deleteItem = (id: string) => {
    // 削除後のgoalsの要素数が10未満の場合、追加できるようにする。
    if (goals.length <= 10) {
      setCanAdd(true);
    }

    // 削除後のgoalsの要素数が3未満の場合、削除できないようにする。
    if (goals.length <= 3) {
      setCanDelete(false);
    }

    const newGoals = goals.filter(goal => goal.id !== id);
    setGoals(newGoals);
  }

  return (
    <div className="w-full ">
      <div className={`${orbitron.className} mb-8`}><span className="text-4xl">{t("appTitle")}</span><span className="ml-6 text-4sm">by.<a href="https://slash-mochi.net/" target="_blank" className="text-blue-600 hover:text-blue-800 hover:underline">slash-mochi.net</a></span></div>
      <div className="flex flex-col flex-nowrap justify-start items-center">
        {goals.map((item) => (
          <div key={item.id} className="w-full m-1">
            <ListItem
              label={item.value}
              canDelete={canDelete}
              onChange={(newValue) => changeItem(newValue, item.id)}
              onDelete={() => deleteItem(item.id)}
              autoFocus={focusId === item.id}
              onFocused={() => {
                // once focus is given we no longer need to remember the id
                if (focusId === item.id) setFocusId(null);
              }}
            ></ListItem>
          </div>
        ))}
        <div className="m-1"><AddButton onClick={addItem} disabled={!canAdd} /></div>
      </div>
      <GoButton onClick={gotoAmida}>{t("start")}</GoButton>
    </div>
  )
}
