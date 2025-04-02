import { PatternFormat } from "react-number-format";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  required = true,
}) => {
  return (
    <PatternFormat
      format="+380 (##) ###-##-##"
      allowEmptyFormatting
      mask="_"
      value={value}
      onValueChange={(v) => {
        onChange(v.formattedValue);
      }}
      type="tel"
      required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="+380 (00) 000-00-00"
    />
  );
};
