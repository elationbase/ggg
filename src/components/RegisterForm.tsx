import { ROUTE_API } from '@/lib/routes';
import { registerSchema } from '@/lib/schemas';
import { Button, Error, InputText } from '@/ui';
import type { z } from 'astro/zod';
import { useState } from 'react';

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof registerSchema>>;

async function postFormData(formData: FormData) {
  const res = await fetch(ROUTE_API.register, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.redirected) {
    return window.location.assign(res.url);
  }

  return res;
}

export function RegisterForm() {
  const [clientErrors, setClientErrors] = useState<Errors>();
  const [formErrors, setFormErrors] = useState();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientErrors(undefined);
    setFormErrors(undefined);

    const data = new FormData(event.currentTarget);
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }

    const response = await postFormData(data);

    if (response?.error) {
      setFormErrors(response.error);
    }
  }

  const renderFormErrors = () => {
    if (!formErrors) {
      return null;
    }
    if (formErrors === 'auth/email-already-exists') {
      return <Error message="The email address is already in use by another account" />;
    }
    return <Error message={formErrors} />;
  };

  return (
    <form className="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-2">
        <InputText
          id="name"
          label="Username"
          isInvalid={Boolean(clientErrors?.fieldErrors.name)}
          errorMessage={clientErrors?.fieldErrors.name}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <InputText
          id="email"
          label="Email"
          isInvalid={Boolean(clientErrors?.fieldErrors.email)}
          errorMessage={clientErrors?.fieldErrors.email}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <InputText
          id="password"
          label="Password"
          isInvalid={Boolean(clientErrors?.fieldErrors.password)}
          errorMessage={clientErrors?.fieldErrors.password}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <InputText
          id="confirmPassword"
          label="Confirm Password"
          isInvalid={Boolean(clientErrors?.fieldErrors.confirmPassword)}
          errorMessage={clientErrors?.fieldErrors.confirmPassword}
        />
      </div>
      <Button color="primary" type="submit">
        Register
      </Button>
      {renderFormErrors()}
    </form>
  );
}
