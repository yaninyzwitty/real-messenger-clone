"use client";

import {FieldValues, UseFormRegister} from "react-hook-form";

type Props = {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: any;
  required?: boolean;
  placeholder?: string;
  type?: string;
};
function MessageInput({
  id,
  register,
  errors,
  required,
  placeholder,
  type,
}: Props) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, {required})}
        className="text-black font-light py-2 px-4 bg-neutral-100 rounded-full w-full focus:outline-none"
      />
    </div>
  );
}

export default MessageInput;
