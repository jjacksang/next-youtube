import { useCallback, useState } from 'react';

type ModalType = 'comment' | 'share' | null;

export function useModalManager() {
  const [modal, setModal] = useState<ModalType>(null);

  const openModal = useCallback((type: ModalType) => setModal(type), []);
  const closeModal = useCallback(() => setModal(null), []);

  return { modal, openModal, closeModal };
}
