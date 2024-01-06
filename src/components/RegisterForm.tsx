import { ROUTE_API } from '@lib/routes';
import { registerSchema } from '@lib/schemas';
import { Error } from '@ui/Error';
import { ErrorPlaceholder } from '@ui/ErrorPlaceholder';
import { Show } from '@ui/Show';
import { InputText, Label } from '@ui/form';
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

export default function SignupForm() {
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
        <Label htmlFor="name" text="Username" />
        <InputText id="name" />
        <Show when={Boolean(clientErrors?.fieldErrors.name)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.name} />
        </Show>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="email" text="Email" />
        <InputText id="email" type="email" />
        <Show when={Boolean(clientErrors?.fieldErrors.email)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.email} />
        </Show>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="password" text="Password" />
        <InputText id="password" type="password" />
        <Show when={Boolean(clientErrors?.fieldErrors.password)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.password} />
        </Show>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="confirmPassword" text="Confirm Password" />
        <InputText id="confirmPassword" type="password" />
        <Show
          when={Boolean(clientErrors?.fieldErrors.confirmPassword)}
          fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.confirmPassword} />
        </Show>
      </div>
      <button
        className="bg-zinc-800 py-1.5 border border-zinc-900 rounded mt-2 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 focus:ring-offset-zinc-900"
        type="submit">
        Sign up
      </button>
      {renderFormErrors()}
    </form>
  );
}
