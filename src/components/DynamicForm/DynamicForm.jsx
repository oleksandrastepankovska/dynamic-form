import { useFormContext } from "react-hook-form";
import { FormField } from "./FormField/FormField";
import { S } from "./styled";

export const DynamicForm = ({ data, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useFormContext();

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)} role="form">
        <S.Title>Dynamic Form</S.Title>
        {data?.fields?.map((field) => (
          <FormField key={field.id} field={field} register={register} />
        ))}
        <S.Button type="submit" disabled={!isValid}>
          Submit
        </S.Button>
      </S.Form>
    </S.Wrapper>
  );
};
