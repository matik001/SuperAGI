import { ConfigProvider, theme as antdTheme } from 'antd';
import React, { ReactNode } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

interface AppThemeProviderProps {
	children: ReactNode;
}
const GlobalStyle = createGlobalStyle`
body, html, #root {
  width: 100%;
  margin: 0;
  background-color: ${(args) => args.theme.bgColor};
  color: ${(args) => args.theme.textColor};
}
h1{
	color: ${(args) => args.theme.primaryColor};

}
*{
	font-family: 'Roboto', sans-serif;
}
`;
export interface AppTheme {
	primaryColor: string;
	bgColor: string;
	textColor: string;
	isDarkMode: boolean;
}
declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends AppTheme {}
}
const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
	const { isDarkMode } = useDarkMode();

	const themeDark: AppTheme = {
		primaryColor: 'orange',
		textColor: 'white',
		bgColor: '#111111',
		isDarkMode: true
	};
	const themeLight: AppTheme = {
		primaryColor: '#f19808',
		bgColor: '#efefef',
		textColor: 'black',
		isDarkMode: false
	};
	const theme = isDarkMode ? themeDark : themeLight;
	const { defaultAlgorithm, darkAlgorithm } = antdTheme;

	return (
		<ThemeProvider theme={theme}>
			<ConfigProvider
				theme={
					isDarkMode
						? {
								token: {
									colorPrimary: theme.primaryColor,
									colorBgBase: theme.bgColor
								},
								algorithm: darkAlgorithm
						  }
						: {
								token: {
									colorPrimary: theme.primaryColor
								},
								algorithm: defaultAlgorithm
						  }
				}
			>
				<>
					<GlobalStyle />
					{children}
				</>
			</ConfigProvider>
		</ThemeProvider>
	);
};

export default AppThemeProvider;
