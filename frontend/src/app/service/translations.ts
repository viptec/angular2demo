// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from '../i18n/lang-en';
import { LANG_DE_NAME, LANG_DE_TRANS } from '../i18n/lang-de';
//import { LANG_ZH_NAME, LANG_ZH_TRANS } from './lang-zh';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
const dictionary = {
	[LANG_EN_NAME]: LANG_EN_TRANS,
	[LANG_DE_NAME]: LANG_DE_TRANS/*,
	[LANG_ZH_NAME]: LANG_ZH_TRANS,*/
};

// providers
export const TRANSLATION_PROVIDERS = [
	{ provide: TRANSLATIONS, useValue: dictionary },
];