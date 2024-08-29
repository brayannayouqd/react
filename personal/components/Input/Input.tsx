import { Input as NextInput, InputProps as NextInputProps } from "@nextui-org/input";
import { useController, useFormContext } from "react-hook-form";

interface InputProps extends NextInputProps {
  name: string;
  defaultValue?: string;
}

export function Input(props: InputProps) {
  const { control } = useFormContext();
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: props.defaultValue,
  });

  // const error = _get(formState.errors, name);

  return <NextInput  {...field} {...props} />;
}

