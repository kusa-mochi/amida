import { FC } from "react";
import { ListItem } from "./listItem";
import { Button } from "./button";

type Props = {
  gotoAmida?: () => void;
}

export const Init: FC<Props> = ({ gotoAmida }) => {
  return (
    <div>
      <div>AMIDA</div>
      <div>
        <ListItem text="おいしいレストラン" />
        <ListItem text="好きなレストラン" />
        <ListItem text="楽しいレストラン" />
        <ListItem text="思い出のレストラン" />
        <ListItem text="新しいレストラン" />
        <Button>+</Button>
      </div>
      <button onClick={gotoAmida}>Start</button>
    </div>
  )
}
