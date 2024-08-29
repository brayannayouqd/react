import { Input } from "@/components";

type InputProps = React.ComponentProps<typeof Input>;

type GenericFieldTypes = "text";

type GenericFieldPropsMap = {
  text: InputProps;
};

type FieldTypes = GenericFieldTypes;

type FieldPropsMap = GenericFieldPropsMap;

interface FieldProps<T extends FieldTypes> {
  type: T;
  props?: FieldPropsMap[T];
}

const genericFieldTypes = {
  text: Input,
};

const fieldTypes = { ...genericFieldTypes };

export function Field<T extends FieldTypes>({ type, props }: FieldProps<T>) {
  const Component = fieldTypes[type];
  return <Component {...(props || ({} as any))} />;
}

