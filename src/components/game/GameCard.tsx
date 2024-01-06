import { ROUTE_CLIENT } from '@lib/routes';
import type { GameTypeWithId } from '@lib/types';
import { getDaysLeftToDate } from '@lib/utils';
import { Show } from '@ui/Show';

export function GameCard({ game }: { game: GameTypeWithId }) {
  return (
    <li className="mb-2 bg-white p-3 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-green-500">
      <a href={`${ROUTE_CLIENT.editGame}/${game.documentId}`} className="flex items-center">
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
    </li>
  );
}

function DayCounter({ gameDate }: { gameDate: string }) {
  const days = getDaysLeftToDate(gameDate);

  return (
    <span className="flex flex-col items-center justify-center min-w-32 dark:bg-green-700 py-1 px-2 rounded font-medium dark:text-green-200 text-zinc-600 h-14 w-14 font-sans text-sm">
      <Show when={days > 1} fallback="Today">
        <>{days} days</>
      </Show>
    </span>
  );
}
