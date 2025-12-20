import { FC } from "react";
import { ListItem } from "./listItem";
import { AddButton } from "./addButton";

type Props = {
  gotoAmida?: () => void;
}

export const Init: FC<Props> = ({ gotoAmida }) => {
  const items = [
    "おいしいレストラン",
    "好きなレストラン",
    "楽しいレストラン",
    "思い出のレストラン",
    "新しいレストラン"
  ];
  return (
    <div>
      <div>AMIDA</div>
      <div className="flex flex-col flex-nowrap justify-start items-center">
        {items.map((item, index) => (
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
