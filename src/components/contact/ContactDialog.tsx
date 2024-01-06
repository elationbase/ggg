import type { ContactTypeWithId } from '@lib/types';
import {
  Badge,
  Button,
  Code,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Show } from '@ui/Show';
import { useContext } from 'react';
import { ContactContext } from '.';
import { ContactCard } from './ContactCard';

export function ContactDialog({
  selectedPlayers,
  onSelectPlayer,
  isMaxPlayers,
}: {
  selectedPlayers: ContactTypeWithId[];
  onSelectPlayer: (contact: ContactTypeWithId) => void;
  isMaxPlayers: boolean;
}) {
  const contacts = useContext(ContactContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} fullWidth>
        Add Players
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select Players</ModalHeader>
              <ModalBody>
                <Divider />
                <ul className="w-full grid grid-cols-1 gap-6 pb-4">
                  {contacts.map((contact) => (
                    <li key={contact.documentId}>
                      <button onClick={() => onSelectPlayer(contact)} className="w-full flex">
                        <Badge
                          content={selectedPlayers.indexOf(contact) + 1}
                          color="primary"
                          isInvisible={!selectedPlayers.includes(contact)}>
                          <ContactCard contact={contact} isSelect />
                        </Badge>
                      </button>
                      <Divider />
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Show when={isMaxPlayers}>
                  <Code color="secondary">Max Number of Players Selected</Code>
                </Show>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Select
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
