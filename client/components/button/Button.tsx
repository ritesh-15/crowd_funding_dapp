import React from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
}

export default function Button({ title, className, ...props }: IProps) {
  return (
    <button
      className={
        "bg-primary hover:bg-primaryHover transition font-nato cursor-pointer rounded-md " +
        className
      }
      {...props}
    >
      {title}
    </button>
  );
}
