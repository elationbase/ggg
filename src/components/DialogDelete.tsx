import { TEXT } from '@lib/i18n';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

type DialogDeleteProps = {
  documentId?: string;
  type?: 'contacts' | 'games';
};

async function deleteRecord(documentId?: string, type?: 'contacts' | 'games') {
  if (!documentId || !type) return;

  const res = await fetch(`/api/${type}/${documentId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.redirected) {
    window.location.assign(res.url);
  }
}

export function DialogDelete({ documentId, type }: DialogDeleteProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const headerText = type === 'games' ? TEXT.deleteDialog.trigger[0] : TEXT.deleteDialog.trigger[1];
  return (
    <>
      <Button onPress={onOpen}>{headerText}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {TEXT.deleteDialog.absolutelySure}
              </ModalHeader>
              <ModalBody>
                <p>{TEXT.deleteDialog.absolutelySure}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {TEXT.deleteDialog.cancel}
                </Button>
                <Button color="primary" onClick={() => deleteRecord(documentId, type)}>
                  {TEXT.deleteDialog.yesDelete}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
