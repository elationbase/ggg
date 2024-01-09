import type { ContactTypeWithId, GameTypeWithId } from '@lib/types';
import { ContactContext } from '../contact/Contact.Context';
import { GameCard } from './GameCard';

export function GameList({
  games,
  contacts,
}: {
  games?: GameTypeWithId[];
  contacts?: ContactTypeWithId[];
}) {
  return (
    <ContactContext.Provider value={contacts ?? []}>
      <div className="grid grid-cols-1 gap-6 pb-4">
        {games?.map((game) => (
          <GameCard game={game} key={game.documentId} />
        ))}
      </div>
    </ContactContext.Provider>
  );
}
