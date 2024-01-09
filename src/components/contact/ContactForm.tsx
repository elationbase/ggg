import { DialogDelete } from '@/components/DialogDelete';
import { ROUTE_API } from '@/lib/routes';
import { createContactSchema } from '@/lib/schemas';
import type { ContactTypeWithId } from '@/lib/types';
import { Error, ErrorPlaceholder, InputText, Show } from '@/ui';
import { Button } from '@nextui-org/react';
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
        <InputText id="name" defaultValue={contactInfo?.name ?? ''} />
        <Show when={Boolean(clientErrors?.fieldErrors.name)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.name} />
        </Show>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <InputText id="group" defaultValue={contactInfo?.group ?? ''} />
        <Show when={Boolean(clientErrors?.fieldErrors.group)} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors?.fieldErrors.group} />
        </Show>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="grid grid-cols-1 gap-2 flex-1">
          <InputText type="email" id="email" defaultValue={contactInfo?.email ?? ''} />
          <Show when={Boolean(clientErrors?.fieldErrors.email)} fallback={<ErrorPlaceholder />}>
            <Error message={clientErrors?.fieldErrors.email} />
          </Show>
        </div>
      </div>
      <Button type="submit" color="primary">
        <Show fallback="Create New Contact" when={type === 'edit'}>
          Save Contact
        </Show>
      </Button>
      <Show when={Boolean(formErrors)}>
        <Error message={formErrors} />
      </Show>
      <Show when={type === 'edit'}>
        <DialogDelete documentId={contactInfo?.documentId} type="contacts" />
      </Show>
    </form>
  );
}
