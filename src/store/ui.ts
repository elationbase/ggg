import { atom } from 'nanostores';

type UiType = {
  isContactDialiogOpen: boolean;
};

const defaultUi: UiType = {
  isContactDialiogOpen: false,
};

export const $ui = atom<UiType>(defaultUi);

export const setIsContactDialiogOpen = (bol: boolean) => {
  $ui.set({ ...$ui.get(), isContactDialiogOpen: bol });
};
