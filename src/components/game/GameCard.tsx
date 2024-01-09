import { ROUTE_CLIENT } from '@/lib/routes';
import type { GameTypeWithId } from '@/lib/types';
import { Card } from '@nextui-org/react';
import { DayCounter } from '../DayCounter';

export function GameCard({ game }: { game: GameTypeWithId }) {
  return (
    <Card isBlurred>
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
