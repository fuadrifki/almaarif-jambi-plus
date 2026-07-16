export type SelectOption = {
  label: string | number;
  value: string | number;
  disabled?: boolean;
};

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectStatus = 'idle' | 'error' | 'loading';

export type SelectProps = {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string;
  placeholder?: string;
  size?: SelectSize;
  status?: SelectStatus;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string | number) => void;
};
