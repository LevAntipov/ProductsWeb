import classes from './Input.module.css';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type: 'text' | 'email' | 'password';
}

export const Input = ({ placeholder, value, onChange, type = 'text' }: InputProps) => {
  return (
    <input
      className={classes.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
};
