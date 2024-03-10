import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkMode } from "./utils/atoms";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/themes";
import { styled } from "styled-components";
import {
	MdLightMode as LightModeBtn,
	MdModeNight as NightModeBtn,
} from "react-icons/md";
import { GlobalStyle } from "./styles/styles";

const DarkModeBtn = styled.div`
	color: ${(props) => props.theme.text};
	background: ${(props) => props.theme.body};
	font-size: 1.5rem;
	border-radius: 100%;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 10px;
	right: 10px;
`;

function App() {
	const [isdarkmode, setisDarkMode] = useRecoilState(darkMode);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/character/:id",
			element: <DetailPage />,
		},
	]);

	return (
		<ThemeProvider theme={isdarkmode ? darkTheme : lightTheme}>
			<GlobalStyle />
			<RouterProvider router={router} />
			<DarkModeBtn onClick={() => setisDarkMode(!isdarkmode)}>
				{isdarkmode ? <LightModeBtn /> : <NightModeBtn />}
			</DarkModeBtn>
		</ThemeProvider>
	);
}

export default App;
