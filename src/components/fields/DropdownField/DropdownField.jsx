import { useFormContext } from "react-hook-form";
import { S } from "../styled";

export const DropdownField = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { id, label, placeholder, options, rules } = field;

  const fieldRules = {
    required: rules?.required ? "Please select an option" : false,
  };

  return (
    <S.Wrapper>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Select
        id={id}
        {...register(label, fieldRules)}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Select>
      {errors[label] && <S.Error>{errors[label]?.message}</S.Error>}
    </S.Wrapper>
  );
};
