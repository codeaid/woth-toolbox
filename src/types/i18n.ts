import { toolboxResources, wothResources } from 'config/i18n';

export interface TranslationResources {
  toolbox: typeof toolboxResources;
  woth: typeof wothResources;
}

export type TranslationAnimal = {
  description: TranslationKey;
  heading: TranslationKey;
  latin: TranslationKey;
};

export type TranslationKey =
  | keyof TranslationResources['woth']
  | keyof TranslationResources['toolbox'];

export type TranslationWeapon = {
  action: TranslationKey;
  caliber: TranslationKey;
  description: TranslationKey;
  heading: TranslationKey;
};

export type Translator = (id: TranslationKey) => string;
