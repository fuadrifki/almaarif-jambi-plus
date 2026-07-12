export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectStatus = 'idle' | 'error' | 'loading';

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: SelectSize;
  status?: SelectStatus;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};
