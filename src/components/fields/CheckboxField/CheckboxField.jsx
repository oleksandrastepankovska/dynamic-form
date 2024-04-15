import { useFormContext } from "react-hook-form";
import { S } from "../styled";

export const CheckboxField = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { id, label, rules } = field;

  const fieldRules = {
    required: rules?.required ? "Please check this box" : false,
  };

  return (
    <S.Wrapper>
      <S.CheckboxInput
        type="checkbox"
        id={id}
        {...register(label, fieldRules)}
      />
      <label htmlFor={id}>{label}</label>
      {errors[label] && <S.Error>{errors[label].message}</S.Error>}
    </S.Wrapper>
  );
};
