import { S } from "../styled";
import { useFormContext } from "react-hook-form";

export const TextField = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { id, label, placeholder, rules } = field;

  const fieldRules = {
    required: rules?.required ? "This field is required" : false,
    pattern: rules?.pattern
      ? {
          value: new RegExp(rules?.pattern),
          message: "Invalid input",
        }
      : false,
    minLength: rules?.minLength
      ? {
          value: rules?.minLength,
          message: `Minimum length is ${rules?.minLength}`,
        }
      : false,
    maxLength: rules?.maxLength
      ? {
          value: rules?.maxLength,
          message: `Maximum length is ${rules?.maxLength}`,
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
        type="text"
        id={id}
        placeholder={placeholder}
        {...register(label, fieldRules)}
      />
      {errors[label] && <S.Error role="alert">{errors[label].message}</S.Error>}
    </S.Wrapper>
  );
};
