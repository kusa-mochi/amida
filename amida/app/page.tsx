"use client";

import { Init } from "./components/init";
import { Amida } from "./components/amida";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export type Goal = {
  id: string;
  value: string;
};
export const GoalsContext = createContext<{ goals: Goal[], setGoals: (goals: Goal[]) => void } | null>(null);

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([
    {id: uuidv4(), value:"おいしいレストラン"},
    {id: uuidv4(), value:"楽しいレストラン"},
    {id: uuidv4(), value:"思い出のレストラン"},
  ]);
  const [initVisible, setInitVisible] = useState(true);
  const [amidaVisible, setAmidaVisible] = useState(false);
  function gotoAmida() {
    setInitVisible(false);
    setAmidaVisible(true);
  }
  function gotoInit() {
    setInitVisible(true);
    setAmidaVisible(false);
  }
  return (
    <GoalsContext.Provider value={{ goals, setGoals }}>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          {initVisible && <Init gotoAmida={gotoAmida} />}
          {amidaVisible && <Amida gotoInit={gotoInit} />}
        </main>
      </div>
    </GoalsContext.Provider>
  );
}
