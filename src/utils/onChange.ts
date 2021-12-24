import {ChangeEvent} from "react";

export const onChange = (callback: (value: string) => void) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    callback(e.target.value);
  }

}
