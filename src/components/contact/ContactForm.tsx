import { DialogDelete } from '@components/DialogDelete';
import { ROUTE_API } from '@lib/routes';
import { createContactSchema } from '@lib/schemas';
import type { ContactTypeWithId } from '@lib/types';
import { Error } from '@ui/Error';
import { ErrorPlaceholder } from '@ui/ErrorPlaceholder';
import type { z } from 'astro/zod';
import { Show, createResource, createSignal } from 'solid-js';

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof createContactSchema>>;

export function ContactForm({
  contactInfo,
  type,
}: {
  contactInfo?: ContactTypeWithId;
  type?: 'edit';
}) {
  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, submitFormData);
  const [clientErrors, setClientErrors] = createSignal<Errors>();

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

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientErrors();
    const data = new FormData(e.currentTarget);
    const result = createContactSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }
    setFormData(data);
  }

  return (
    <form class="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
      <div class="grid grid-cols-1 gap-2">
        <label for="name" class="font-medium dark:text-zinc-300 text-zinc-900 text-sm">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={contactInfo?.name ?? ''}
          name="name"
          class="rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 focus:border-transparent dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:bg-zinc-900 focus:bg-white"
        />
        <Show when={clientErrors()?.fieldErrors.name} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors()?.fieldErrors.name} />
        </Show>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <label for="group" class="font-medium dark:text-zinc-300 text-zinc-900 text-sm">
          Group
        </label>
        <input
          type="text"
          id="group"
          value={contactInfo?.group ?? ''}
          name="group"
          class="rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 focus:border-transparent dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:bg-zinc-900 focus:bg-white"
        />
        <Show when={clientErrors()?.fieldErrors.group} fallback={<ErrorPlaceholder />}>
          <Error message={clientErrors()?.fieldErrors.group} />
        </Show>
      </div>
      <div class="flex flex-row gap-4 w-full">
        <div class="grid grid-cols-1 gap-2 flex-1">
          <label for="email" class="font-medium dark:text-zinc-300 text-zinc-900 text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo?.email ?? ''}
            class="rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 focus:border-transparent dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:bg-zinc-900 focus:bg-white"
          />
          <Show when={clientErrors()?.fieldErrors.email} fallback={<ErrorPlaceholder />}>
            <Error message={clientErrors()?.fieldErrors.email} />
          </Show>
        </div>
      </div>
      <button
        class="dark:bg-violet-700 bg-violet-300 border-transparent hover:border-violet-400 dark:hover:border-violet-500 py-1.5 border rounded-md mt-1 dark:text-violet-100 dark:hover:text-white text-violet-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={response.loading}>
        <Show fallback={type === 'edit' ? 'Edit' : 'Create'} when={response.loading}>
          {type === 'edit' ? 'Editing...' : 'Creating...'}
        </Show>
      </button>
      <Show when={type === 'edit'}>
        <DialogDelete documentId={contactInfo?.documentId} type="contacts" />
      </Show>
    </form>
  );
}
