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

  beforeEach(() => {
    render(
      <FormProviderWrapper>
        <DynamicForm data={mockedFields} submit={onSubmitMock} />
      </FormProviderWrapper>,
    );
  });

  it("should render all the fields correctly", async () => {
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
    const emailInput = screen.getByLabelText("Email");

    await act(async () => {
      fireEvent.change(emailInput, {
        target: {
          value: "123",
        },
      });
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid input");
  });

  it("should display error based on min max rules", async () => {
    const ageInput = screen.getByLabelText("Age");

    await act(async () => {
      fireEvent.change(ageInput, {
        target: {
          value: 1234,
        },
      });
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Maximum value is 120");

    await act(async () => {
      fireEvent.change(ageInput, {
        target: {
          value: 1,
        },
      });
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Minimum value is 18");
  });

  it("should display required error if required: true", async () => {
    const ageInput = screen.getByLabelText("Age");

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

    expect(screen.getByRole("alert")).toHaveTextContent(
      "This field is required",
    );
  });

  it("should disable submit button if form is not valid", async () => {
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();
  });

  it("submit button should not be disabled if form is valid", async () => {
    const ageInput = screen.getByLabelText("Age");

    const emailInput = screen.getByLabelText("Email");

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

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("form is submitted with correct values", async () => {
    const ageInput = screen.getByLabelText("Age");

    const emailInput = screen.getByLabelText("Email");

    const submitButton = screen.getByRole("button", { name: "Submit" });

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
