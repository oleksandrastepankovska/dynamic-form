import { S } from "../styled";
import { useFormContext } from "react-hook-form";

export const NumberField = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { id, label, placeholder, rules } = field;

  const fieldRules = {
    required: rules?.required ? "This field is required" : false,
    pattern: rules?.pattern
      ? {
          value: new RegExp(rules.pattern),
          message: "Invalid input",
        }
      : false,
    min: rules?.min
      ? {
          value: rules.min,
          message: `Minimum value is ${rules.min}`,
        }
      : false,
    max: rules?.max
      ? {
          value: rules.max,
          message: `Maximum value is ${rules.max}`,
        }
      : false,
  };

  return (
    <S.Wrapper>
      <S.LabelWrapper>
        <S.Label htmlFor={id}>{label}</S.Label>
        {rules?.required && <span style={{ color: "#5353ec" }}>*</span>}
      </S.LabelWrapper>
      <S.Input
        type="number"
        id={id}
        min="0"
        placeholder={placeholder}
        {...register(label, fieldRules)}
      />
      {errors[label] && <S.Error role="alert">{errors[label].message}</S.Error>}
    </S.Wrapper>
  );
};
