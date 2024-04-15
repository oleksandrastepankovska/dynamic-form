import { NumberField } from "../../fields/NumberField/NumberField";
import { TextField } from "../../fields/TextField/TextField";
import { DropdownField } from "../../fields/DropdownField/DropdownField";
import { RadioField } from "../../fields/RadioField/RadioField";
import { CheckboxField } from "../../fields/CheckboxField/CheckboxField";
import { TextareaField } from "../../fields/TextareaField/TextareaField";

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
