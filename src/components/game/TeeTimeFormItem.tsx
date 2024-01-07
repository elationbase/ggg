import { ContactDialog } from '@components/contact';
import type { ContactTypeWithId } from '@lib/types';
import { Error } from '@ui/Error';
import { ErrorPlaceholder } from '@ui/ErrorPlaceholder';
import { Show } from '@ui/Show';
import { InputText, Label } from '@ui/form';
import { IconClose } from '@ui/icons';
import { useState } from 'react';

type TeeTimeFormItemProps = {
  id: number;
  time?: string;
  players?: string[];
  timeError?: string[];
  emailError?: string[];
  onRemove: () => void;
};

export function TeeTimeFormItem({
  id,
  time = '',
  players = [],
  timeError,
  emailError,
  onRemove,
}: TeeTimeFormItemProps) {
  // State for selected players, initially empty
  const [selectedPlayers, setSelectedPlayers] = useState<ContactTypeWithId[]>([]);
  const MAX_NUM_PLAYERS = 4; // Maximum number of players allowed

  // Function to handle player selection
  const onSelectPlayer = (contact: ContactTypeWithId) => {
    // If the selected player is already in the list, remove them
    if (selectedPlayers.includes(contact)) {
      return setSelectedPlayers(selectedPlayers.filter((c) => c !== contact));
    }

    // If the maximum number of players is reached, do nothing
    if (selectedPlayers.length >= MAX_NUM_PLAYERS) {
      return;
    }

    // Add the selected player to the list
    return setSelectedPlayers([...selectedPlayers, contact]);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow relative">
      <Show when={id !== 0}>
        <button className="absolute top-2 right-2" onClick={onRemove}>
          <IconClose size={20} />
        </button>
      </Show>
      <div className="flex flex-row gap-4 w-full mb-4">
        <div className="grid grid-cols-1 gap-2 flex-1">
          <Label htmlFor={`time${id}`} text="Select Time:" />
          <InputText type="time" id={`time${id}`} defaultValue={time} />
          <Show when={Boolean(timeError)} fallback={<ErrorPlaceholder />}>
            <Error message={timeError} />
          </Show>
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="grid grid-cols-1 gap-2 flex-1">
          <Label htmlFor={`email${id}`} text="Players:" />
          {/* <InputText type="email" id={`email${id}`} defaultValue={players} /> */}
          {selectedPlayers.map((player, index) => (
            <span key={player.documentId}>
              <input type="hidden" name={`time${id}_player${index}`} value={player.email} />
              {player.name}
            </span>
          ))}
          <Show when={Boolean(emailError)} fallback={<ErrorPlaceholder />}>
            <Error message={emailError} />
          </Show>
        </div>
      </div>
      <ContactDialog
        selectedPlayers={selectedPlayers}
        onSelectPlayer={onSelectPlayer}
        isMaxPlayers={selectedPlayers.length >= MAX_NUM_PLAYERS}
      />
    </div>
  );
}
