export const mockedFields = {
  fields: [
    {
      id: "field_1",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      rules: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: "[A-Za-z]+",
      },
    },
    {
      id: "field_2",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      rules: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: "[A-Za-z]+",
      },
    },
    {
      id: "field_3",
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      rules: {
        required: true,
        pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      },
    },
    {
      id: "field_4",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      rules: {
        required: true,
        min: 18,
        max: 120,
      },
    },
    {
      id: "field_5",
      type: "select",
      label: "Country",
      placeholder: "Select your country",
      options: [
        { value: "ukraine", label: "Ukraine" },
        { value: "usa", label: "United States" },
        { value: "canada", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
        { value: "france", label: "France" },
        { value: "germany", label: "Germany" },
      ],
      rules: {
        required: true,
      },
    },
    {
      id: "field_7",
      type: "radio",
      label: "Gender",
      options: ["Male", "Female", "Other"],
      rules: {
        required: true,
      },
    },
    {
      id: "field_8",
      type: "textarea",
      label: "Additional Message",
      placeholder: "Enter your message",
      rows: 4,
      rules: {
        required: false,
        minLength: 10,
        maxLength: 500,
      },
    },
    {
      id: "field_6",
      type: "checkbox",
      label: "Subscribe to Newsletter",
      checked: false,
    },
  ],
};
