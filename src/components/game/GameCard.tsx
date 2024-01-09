import { ROUTE_CLIENT } from '@lib/routes';
import type { GameTypeWithId } from '@lib/types';
import { getDaysLeftToDate } from '@lib/utils';
import { Card, Chip } from '@nextui-org/react';
import { Show } from '@ui/Show';

export function GameCard({ game }: { game: GameTypeWithId }) {
  return (
    <Card>
      <a
        href={`${ROUTE_CLIENT.editGame}/${game.documentId}`}
        className="flex items-center w-full justify-between p-4">
        <div>
          <p className="font-medium flex items-center">{game.name}</p>
          <p className="text-xs">{game.location}</p>
          <p className="text-xs">Number of Tee Times: {game.teeTimes?.length}</p>
          <p className="text-xs">
            Times:
            {game?.teeTimes.length &&
              game?.teeTimes?.map(
                (teeTime, index) =>
                  `${teeTime.time} ${index === game.teeTimes.length - 1 ? '' : ' | '}`,
              )}
          </p>
        </div>
        <DayCounter gameDate={game.date} />
      </a>
    </Card>
  );
}

function DayCounter({ gameDate }: { gameDate: string }) {
  const days = getDaysLeftToDate(gameDate);

  return (
    <Chip color="success" variant="flat">
      <Show when={days > 1} fallback="Today">
        <>In {days} days</>
      </Show>
    </Chip>
  );
}
