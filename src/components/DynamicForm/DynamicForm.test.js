import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DynamicForm } from "./DynamicForm";
import "@testing-library/jest-dom";
import { FormProvider, useForm } from "react-hook-form";
import { act } from "react-dom/test-utils";

const FormProviderWrapper = ({ children }) => {
  const methods = useForm({ mode: "onChange" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("DynamicForm", () => {
  const onSubmitMock = jest.fn();
  const mockedFields = {
    fields: [
      {
        id: "field_1",
        type: "text",
        label: "Email",
        placeholder: "Enter your email",
        rules: {
          required: true,
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
        },
      },
      {
        id: "field_2",
        type: "number",
        label: "Age",
        placeholder: "Enter your age",
        rules: { required: true, min: 18, max: 120 },
      },
      {
        id: "field_3",
        type: "select",
        label: "Country",
        options: [
          { value: "usa", label: "United States" },
          { value: "canada", label: "Canada" },
        ],
      },
      {
        id: "field_4",
        type: "radio",
        label: "Favourite animal",
        options: ["Dog", "Cat"],
      },
      {
        id: "field_5",
        type: "checkbox",
        label: "Subscribe to Newsletter",
      },
      {
        id: "field_6",
        type: "textarea",
        label: "Additional Message",
        placeholder: "Enter your message",
      },
    ],
  };

  it("should render all the fields correctly", async () => {
    render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );
    expect(await screen.findByLabelText("Email")).toHaveAttribute(
      "type",
      "text",
    );
    expect(await screen.findByLabelText("Age")).toHaveAttribute(
      "type",
      "number",
    );

    expect(await screen.findByLabelText("Country")).toBeInTheDocument();

    expect(await screen.findByText("Favourite animal")).toBeInTheDocument();
    expect(await screen.findByLabelText("Dog")).toBeInTheDocument();
    expect(await screen.findByLabelText("Cat")).toBeInTheDocument();

    expect(
      await screen.findByText("Subscribe to Newsletter"),
    ).toBeInTheDocument();

    expect(await screen.findByLabelText("Additional Message")).toHaveAttribute(
      "type",
      "textarea",
    );
  });

  it("should display error based on pattern", async () => {
    const { getByLabelText, getByRole } = render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );
    const emailInput = getByLabelText("Email");

    await act(async () => {
      fireEvent.change(emailInput, {
        target: {
          value: "123",
        },
      });
    });

    expect(getByRole("alert")).toHaveTextContent("Invalid input");
  });

  it("should display error based on min max rules", async () => {
    const { getByLabelText, getByRole } = render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );
    const ageInput = getByLabelText("Age");

    await act(async () => {
      fireEvent.change(ageInput, {
        target: {
          value: 1234,
        },
      });
    });

    expect(getByRole("alert")).toHaveTextContent("Maximum value is 120");

    await act(async () => {
      fireEvent.change(ageInput, {
        target: {
          value: 1,
        },
      });
    });

    expect(getByRole("alert")).toHaveTextContent("Minimum value is 18");
  });

  it("should display required error if required: true", async () => {
    const { getByLabelText, getByRole } = render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );

    const ageInput = getByLabelText("Age");

    await act(async () => {
      fireEvent.change(ageInput, {
        target: {
          value: 1,
        },
      });
      fireEvent.change(ageInput, {
        target: {
          value: "",
        },
      });
    });

    expect(getByRole("alert")).toHaveTextContent("This field is required");
  });

  it("should disable submit button if form is not valid", async () => {
    const { getByRole } = render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );

    const submitButton = getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();
  });

  it("submit button should not be disabled if form is valid", async () => {
    const mockedFields = {
      fields: [
        {
          id: "simpleField",
          type: "number",
          label: "simpleField",
          placeholder: "enter smth",
          rules: { required: true },
        },
      ],
    };
    const { getByRole } = render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );

    const simpleField = getByRole("spinbutton", { name: "simpleField" });

    await act(async () => {
      fireEvent.change(simpleField, {
        target: {
          value: 0,
        },
      });
      fireEvent.blur(simpleField);
    });

    const submitButton = getByRole("button", { name: "Submit" });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("form is submitted with correct values", async () => {
    const { getByRole, getByLabelText } = render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );

    const ageInput = getByLabelText("Age");

    const emailInput = getByLabelText("Email");

    const submitButton = getByRole("button", { name: "Submit" });

    await act(async () => {
      fireEvent.change(emailInput, {
        target: {
          value: "oleksandra.st3@gmail.com",
        },
      });
      fireEvent.change(ageInput, {
        target: {
          value: 18,
        },
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        "Additional Message": "",
        Age: "18",
        Country: "usa",
        Email: "oleksandra.st3@gmail.com",
        "Favourite animal": null,
        "Subscribe to Newsletter": false,
      });
    });
  });
});
