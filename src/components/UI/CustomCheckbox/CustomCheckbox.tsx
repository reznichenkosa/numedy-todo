import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./CustomCheckbox.module.css";

interface CustomCheckboxProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (props) => {
  return (
    <label className="cursor-pointer relative flex items-center justify-center">
      <input
        {...props}
        type="checkbox"
        className={cn(
          "appearance-none h-6 w-6 border-2 rounded-md border-purple-500",
          styles["custom-checkbox"]
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3.5}
        stroke="currentColor"
        className={cn(
          "w-5 h-5 absolute top-0.5 left-0.5 opacity-0 transition-all ease-in-out",
          styles["check"]
        )}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </label>
  );
};

export default CustomCheckbox;
