"use client";

import Image from "next/image";
import { Init } from "./components/init";
import { Amida } from "./components/amida";
import { useState } from "react";

export default function Home() {
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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          {initVisible && <Init gotoAmida={gotoAmida} />}
          {amidaVisible && <Amida gotoInit={gotoInit} />}
        </main>
      </div>
  );
}
