import {
  CheckboxField,
  TextField,
  DropdownField,
  RadioField,
  TextareaField,
  NumberField,
} from "../../fields";

export const FormField = (props) => {
  switch (props.field.type) {
    case "text":
      return <TextField {...props} />;
    case "number":
      return <NumberField {...props} />;
    case "select":
      return <DropdownField {...props} />;
    case "radio":
      return <RadioField {...props} />;
    case "checkbox":
      return <CheckboxField {...props} />;
    case "textarea":
      return <TextareaField {...props} />;
    default:
      return null;
  }
};
