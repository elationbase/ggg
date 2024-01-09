import type { createGameSchema } from '@lib/schemas';
import type { GameTypeWithId } from '@lib/types';
import { Show } from '@ui/Show';
import { Button, Label } from '@ui/form';
import type { z } from 'astro/zod';
import { useState } from 'react';
import { TeeTimeFormItem } from './TeeTimeFormItem';

type Errors = z.typeToFlattenedError<z.inferFormattedError<typeof createGameSchema>>;

export function TeeTimeForm({
  gameInfo,
  clientErrors,
}: {
  gameInfo?: GameTypeWithId;
  clientErrors?: Errors;
}) {
  const onRemove = (index: number) => {
    const newTeeTimes = teeTimes.filter((_, i) => i !== index);
    setTeeTimes(newTeeTimes);
  };

  const cretateTeeTime = (index: number) => {
    return (
      <TeeTimeFormItem
        id={index}
        time={gameInfo?.teeTimes[index]?.time}
        players={gameInfo?.teeTimes[index]?.players}
        key={`teetime-${index}`}
        onRemove={() => onRemove(index)}
      />
    );
  };

  const initiealTeeTimes = () => {
    const teeTimesLength = gameInfo?.teeTimes?.length ?? 1;
    const teeTimes = [];
    for (let i = 0; i < teeTimesLength; i++) {
      teeTimes.push(cretateTeeTime(i));
    }
    return teeTimes;
  };

  const [teeTimes, setTeeTimes] = useState(initiealTeeTimes());

  const isMaxTeeTimes = () => teeTimes.length >= 4;

  const addTeeTime = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setTeeTimes([...teeTimes, cretateTeeTime(teeTimes.length)]);
  };

  return (
    <>
      <Label text="Tee Times" />
      {teeTimes}
      <Show when={!isMaxTeeTimes()}>
        <Button onClick={addTeeTime} color="primary" variant="bordered">
          Add Tea Time
        </Button>
      </Show>
    </>
  );
}
