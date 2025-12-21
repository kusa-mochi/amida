"use client";

import { FC, useContext, useEffect } from "react";
import { GoalsContext } from "../page";
import { ListItem } from "./listItem";
import { AddButton } from "./addButton";

type Props = {
  gotoAmida?: () => void;
}

export const Init: FC<Props> = ({ gotoAmida }) => {
  const goals = useContext(GoalsContext);
  return (
    <div>
      <div>AMIDA</div>
      <div className="flex flex-col flex-nowrap justify-start items-center">
        {goals.map((item, index) => (
          <div key={index} className="m-1">
            <ListItem>{item}</ListItem>
          </div>
        ))}
        <div className="m-1"><AddButton /></div>
      </div>
      <button onClick={gotoAmida}>Start</button>
    </div>
  )
}
