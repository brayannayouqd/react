import { Form, Field, Button } from "@/components";

export default function FormPage() {
  return (
    <div className="p-4 gap-6 flex flex-col">
      <h1 className="bold">Form Template</h1>

      <Form
        endpoint="/send/form"
        method="post"
        className="gap-4 flex-col flex"
      >
        <Field
          type="text"
          props={{
            name: "name",
            placeholder: "name",
          }}
        />

        <Field
          type="text"
          props={{
            name: "gate",
            placeholder: "gate",
          }}
        />

        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
}

