import { DialogDelete } from '@components/DialogDelete';
import { ContactContext } from '@components/contact';
import { ROUTE_API } from '@lib/routes';
import { createGameSchema } from '@lib/schemas';
import type { ContactTypeWithId, GameTypeWithId } from '@lib/types';
import { Error } from '@ui/Error';
import { Show } from '@ui/Show';
import { InputText, Label } from '@ui/form';
import { useState } from 'react';
import type { z } from 'zod';
import { TeeTimeForm } from './TeeTimeForm';

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof createGameSchema>>;

type GameFormProps = {
  gameInfo?: GameTypeWithId;
  type?: 'edit';
  contacts?: ContactTypeWithId[];
};
export function GameForm({ gameInfo, type, contacts }: GameFormProps) {
  const [clientErrors, setClientErrors] = useState<Errors>();
  const [formErrors, setFormErrors] = useState<string>();

  async function submitFormData(formData: FormData) {
    let apiUrl = ROUTE_API.games;
    let method = 'POST';
    if (type === 'edit' && gameInfo?.authorId) {
      formData.append('authorId', gameInfo.authorId);
      apiUrl = `${ROUTE_API.games}/${gameInfo?.documentId}`;
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
    const result = createGameSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.flatten() as Errors;
      setClientErrors(errors);
      return;
    }

    const response = await submitFormData(data);

    if (response?.error) {
      setFormErrors(response.error);
    }
  }

  return (
    <ContactContext.Provider value={contacts ?? []}>
      <form className="grid grid-cols-1 gap-3 w-full" onSubmit={submit}>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="name" text="Name" />
          <InputText id="name" defaultValue={gameInfo?.name ?? ''} />
          {clientErrors?.fieldErrors.name && <Error message={clientErrors?.fieldErrors.name} />}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="location" text="Location" />
          <InputText id="location" defaultValue={gameInfo?.location ?? ''} />
          {clientErrors?.fieldErrors.location && (
            <Error message={clientErrors?.fieldErrors.location} />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="date" text="Date" />
          <InputText
            type="date"
            id="date"
            defaultValue={gameInfo?.date ?? ''}
            min={new Date()?.toISOString()?.slice(0, 10)}
          />
          {clientErrors?.fieldErrors.date && <Error message={clientErrors?.fieldErrors.date} />}
        </div>

        <div className="grid gap-2">
          <TeeTimeForm gameInfo={gameInfo} clientErrors={clientErrors?.fieldErrors} />
        </div>

        <button
          className="bg-violet-300 border-transparent hover:border-violet-400 py-1.5 border rounded-md mt-1 dark:text-violet-100 text-violet-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit">
          {type === 'edit' ? 'Edit' : 'Create'}
        </button>
        <Show when={Boolean(formErrors)}>
          <Error message={formErrors} />
        </Show>
        {type === 'edit' && <DialogDelete documentId={gameInfo?.documentId} />}
      </form>
    </ContactContext.Provider>
  );
}
