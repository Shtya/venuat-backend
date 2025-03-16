import { join } from 'path';
import { AcceptLanguageResolver, QueryResolver, I18nOptions, HeaderResolver, I18nJsonLoader } from 'nestjs-i18n';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'ar', // Default language
  loaderOptions: {
    path: join(__dirname, '../i18n/'), // Path to the i18n folder
    watch: true,
    resolvers: [{ use: QueryResolver, options: ['lang'] }, new HeaderResolver(['accept-language']), AcceptLanguageResolver],
  },
  loader: I18nJsonLoader,
};
