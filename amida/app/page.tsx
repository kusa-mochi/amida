"use client";

import Image from "next/image";
import { Init } from "./components/init";
import { Amida } from "./components/amida";
import { createContext, useState } from "react";

export const GoalsContext = createContext<{ goals: string[], setGoals: (goals: string[]) => void } | null>(null);

export default function Home() {
  const [goals, setGoals] = useState([
    "おいしいレストラン",
    "好きなレストラン",
    "楽しいレストラン",
    "思い出のレストラン",
    "新しいレストラン"
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
