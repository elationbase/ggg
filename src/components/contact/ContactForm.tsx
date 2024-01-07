import { DialogDelete } from '@components/DialogDelete';
import { ROUTE_API } from '@lib/routes';
import { createContactSchema } from '@lib/schemas';
import type { ContactTypeWithId } from '@lib/types';
import { Error } from '@ui/Error';
import { ErrorPlaceholder } from '@ui/ErrorPlaceholder';
import { Show } from '@ui/Show';
import { InputText, Label } from '@ui/form';
import type { z } from 'astro/zod';
import { useState } from 'react';

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof createContactSchema>>;

export function ContactForm({
  contactInfo,
  type,
}: {
  contactInfo?: ContactTypeWithId;
  type?: 'edit';
}) {
  const [clientErrors, setClientErrors] = useState<Errors>();
  const [formErrors, setFormErrors] = useState();

  async function submitFormData(formData: FormData) {
    let apiUrl = ROUTE_API.contacts;
    let method = 'POST';
    if (type === 'edit' && contactInfo?.authorId) {
      formData.append('authorId', contactInfo.authorId);
      apiUrl = `${ROUTE_API.contacts}/${contactInfo?.documentId}`;
      method = 'PUT';
    }

    const res = await fetch(apiUrl, {
      method,
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      return data;
    }

    if (res.redirected) {
      window.location.assign(res.url);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientErrors(undefined);
    setFormErrors(undefined);
    const data = new FormData(event.currentTarget);
    const result = createContactSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }

    const response = await submitFormData(data);

    if (response?.error) {
      setFormErrors(response.error.code);
    }
  }

  return (
    <form className="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="name" text="Name" />
        <InputText id="name" defaultValue={contactInfo?.name ?? ''} />
        <Show when={Boolean(clientErrors?.fieldErrors.name)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.name} />
        </Show>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="group" text="Group" />
        <InputText id="group" defaultValue={contactInfo?.group ?? ''} />
        <Show when={Boolean(clientErrors?.fieldErrors.group)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.group} />
        </Show>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="grid grid-cols-1 gap-2 flex-1">
          <Label htmlFor="email" text="Email" />
          <InputText type="email" id="email" defaultValue={contactInfo?.email ?? ''} />
          <Show when={Boolean(clientErrors?.fieldErrors.email)} fallback={<ErrorPlaceholder />}>
            <Error message={clientErrors?.fieldErrors.email} />
          </Show>
        </div>
      </div>
      <button
        className="dark:bg-violet-700 bg-violet-300 border-transparent hover:border-violet-400 dark:hover:border-violet-500 py-1.5 border rounded-md mt-1 dark:text-violet-100 dark:hover:text-white text-violet-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit">
        <Show fallback="Create" when={type === 'edit'}>
          Edit
        </Show>
      </button>
      <Show when={Boolean(formErrors)}>
        <Error message={formErrors} />
      </Show>
      <Show when={type === 'edit'}>
        <DialogDelete documentId={contactInfo?.documentId} type="contacts" />
      </Show>
    </form>
  );
}
