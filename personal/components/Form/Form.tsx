import { FieldValues, useForm, FormProvider } from "react-hook-form";

import { useApiMutate } from "@/core";

interface FormProps {
  name?: string;
  id?: string;
  children?: React.ReactNode;

  endpoint: string;
  method?: "put" | "post" | "patch" | "delete";

  defaultValues?: any;
  options?: any;

  className?: string;
}

export function Form({
  endpoint,
  method = "post",
  defaultValues = {},
  options,
  children,
  className,
  name,
  id,
  ...props
}: FormProps) {
  const formProps = useForm({
    defaultValues,
  });

  const { handleSubmit: onSubmit, getValues } = formProps;

  const formValues = getValues();

  const apiParams = {
    method,
    endpoint,
    queryKey: [endpoint, Object.values(formValues).join()],
    message: {
      success: "Operação realizada com sucesso!",
    },
    options,
  };

  const { mutate } = useApiMutate(apiParams);

  const handleSubmit = (data: FieldValues) => mutate(data);

  return (
    <FormProvider  {...formProps} >
      <form
        id={id}
        name={name}
        onSubmit={onSubmit(handleSubmit)}
        className={className}
        autoComplete="off"
        noValidate
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

