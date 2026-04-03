import classes from './FieldError.module.css';

interface FieldErrorProps {
  errorMessage: string;
}

export const FieldError = ({ errorMessage }: FieldErrorProps) => {
  return (
    <div>
      <span className={classes.error}>{errorMessage}</span>
    </div>
  );
};
