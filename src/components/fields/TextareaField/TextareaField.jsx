import { useFormContext } from "react-hook-form";
import { S } from "../styled";

export const TextareaField = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { id, label, placeholder, rules } = field;

  const fieldRules = {
    required: rules?.required ? "This field is required" : false,
  };

  return (
    <S.Wrapper>
      <S.LabelWrapper>
        <S.Label htmlFor={id}>{label}</S.Label>
        {rules?.required && <span style={{ color: "#5353ec" }}>*</span>}
      </S.LabelWrapper>
      <S.Input
        type="textarea"
        id={id}
        placeholder={placeholder}
        {...register(label, fieldRules)}
      />
      {errors[label] && <S.Error>{errors[label].message}</S.Error>}
    </S.Wrapper>
  );
};
