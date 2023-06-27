"use client";
import ReactSelect from "react-select";
interface Props {
  label: string;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}
function Select({label, value, options, disabled, onChange}: Props) {
  return (
    <div className="z-[100] ">
      <label className="block text-sm font-medium text-gray-900 leading-6">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          isMulti
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
}

export default Select;
