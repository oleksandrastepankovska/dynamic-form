import React from "react";
import { DynamicForm } from "./components/DynamicForm/DynamicForm";
import { mockedFields } from "./mocks/mockedFields";
import { useForm, FormProvider } from "react-hook-form";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}
`;

const App = () => {
  const methods = useForm({ mode: "onChange" });
  const handleSubmit = (data) => {
    console.table(data);
  };

  return (
    <FormProvider {...methods}>
      <GlobalStyle />
      <DynamicForm data={mockedFields} submit={handleSubmit} />
    </FormProvider>
  );
};

export default App;
