import React from "react";
import { useFormContext } from "react-hook-form";
import { S } from "../styled";

export const RadioField = ({ field }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { id, label, options, rules } = field;

  const fieldRules = {
    required: rules?.required ? "Please select an option" : false,
  };

  return (
    <S.Wrapper>
      <S.LabelWrapper>
        <S.Label htmlFor={id}>{label}</S.Label>
        {rules?.required && <span style={{ color: "#5353ec" }}>*</span>}
      </S.LabelWrapper>
      <div id={id}>
        {options.map((option, index) => (
          <S.RadioItem key={index}>
            <input
              type="radio"
              id={index}
              value={option.value}
              {...register(label, fieldRules)}
            />
            <label htmlFor={index}>{option}</label>
          </S.RadioItem>
        ))}
      </div>
      {errors[label] && <S.Error>{errors[label].message}</S.Error>}
    </S.Wrapper>
  );
};
