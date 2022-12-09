import {
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
  HTMLInputTypeAttribute,
} from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  type: HTMLInputTypeAttribute;
  error?: string;
  title: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
}

export default function Input({
  value,
  type,
  error,
  title,
  name,
  onChange,
}: IProps) {
  return (
    <div className="mb-4">
      <label htmlFor="" className="font-nato">
        {title}
      </label>
      <input
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        className="bg-gray-100 dark:bg-gray-700 rounded-md font-nato px-2 mt-2 py-3 w-full outline-none"
      />
      {error && (
        <small className="mt-1 text-[0.75rem] font-nato font-light text-red-400">
          {error}
        </small>
      )}
    </div>
  );
}
