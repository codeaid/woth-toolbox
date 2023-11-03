import type { defaultResource } from 'config/i18n';

export type TranslationKey = keyof typeof defaultResource;

export type TranslationResource = Record<TranslationKey, string>;

export type Translator = (id: TranslationKey) => string;
