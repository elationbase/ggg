import { ContactDialog } from '@components/contact';
import type { ContactTypeWithId } from '@lib/types';
import { Card } from '@nextui-org/react';
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
    <Card className="p-6 relative">
      <Show when={id !== 0}>
        <button className="absolute top-2 right-2" onClick={onRemove}>
          <IconClose size={20} />
        </button>
      </Show>
      <div className="flex flex-row gap-4 w-full mb-4">
        <div className="grid grid-cols-1 gap-2 flex-1">
          <InputText
            label="Time"
            placeholder="00:00"
            type="time"
            id={`time${id}`}
            defaultValue={time}
            isInvalid={Boolean(timeError)}
            errorMessage={timeError}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="grid grid-cols-1 gap-2 flex-1">
          <Label htmlFor={`email${id}`} text="Players:" />
          {/* <InputText type="email" id={`email${id}`} defaultValue={players} /> */}
          <ol className="list-decimal ml-4">
            {selectedPlayers.map((player, index) => (
              <li key={player.documentId}>
                <input type="hidden" name={`time${id}_player${index}`} value={player.email} />
                {player.name}
              </li>
            ))}
          </ol>
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
    </Card>
  );
}
