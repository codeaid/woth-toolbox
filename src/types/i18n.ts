import { toolboxResources, wothResources } from 'config/i18n';

interface TranslationResources {
  toolbox: typeof toolboxResources;
  woth: typeof wothResources;
}

export type TranslationKey =
  | keyof TranslationResources['woth']
  | keyof TranslationResources['toolbox'];

export type Translator = (id: TranslationKey) => string;
