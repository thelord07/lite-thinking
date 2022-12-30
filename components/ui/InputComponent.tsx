import React from "react";

interface Props {
  name: string;
  type: string;
  label: string;
}

const InputComponent = ({ name, type, label }: Props) => {
  return (
    <div className="grid mb-6">
      <div className={`flex w-full ${type !== 'checkbox' ? 'flex-col' : 'flex-row-reverse justify-start items-center gap-2 '}`}>
        <label htmlFor={name} className="block  text-sm font-medium text-start ">{label}</label>
        <input name={name} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 bg-slate-200 border-slate-200 placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    </div>
  );
};

export default InputComponent;
