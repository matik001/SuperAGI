import { Spin } from 'antd';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React, { ReactNode, useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';

interface AppTranslationsProviderProps {
	children: ReactNode;
}

const resources = {
	en: {
		translation: {
			AppTitle: 'Super shortener',
			EnterYourUrl: 'Enter your url',
			Shorten: 'Shorten',
			YourUrl: 'Your url',
			IpInfo: 'IP info',
			GoToLogs: 'Go to logs',
			GoToMainPage: 'Go to main page',
			HeaderName: 'Header name',
			Value: 'Value',
			Refresh: 'Refresh',
			Logs: 'Logs',
			NotFound: 'Not found',
			BackHome: 'Back home'
		}
	},
	pl: {
		translation: {
			AppTitle: 'Super shortener',
			EnterYourUrl: 'Podaj swój url',
			Shorten: 'Skróć',
			YourUrl: 'Twój url',
			IpInfo: 'IP info',
			GoToLogs: 'Przejdź to logów',
			GoToMainPage: 'Przejdź do strony głównej',
			HeaderName: 'Nazwa nagłówka',
			Value: 'Wartość',
			Refresh: 'Odśwież',
			Logs: 'Logi',
			NotFound: 'Nie znaleziono',
			BackHome: 'Powrót na stronę główną'
		}
	}
};
declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'en';
		resources: (typeof resources)['en'];
	}
}
const AppTranslationsProvider: React.FC<AppTranslationsProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		i18next.use(initReactI18next).use(LanguageDetector).init({
			fallbackLng: 'en',
			resources: resources
		});
		setIsLoading(false);
	}, []);

	return <>{isLoading ? <Spin /> : children}</>;
};

export default AppTranslationsProvider;
