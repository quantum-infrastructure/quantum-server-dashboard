import { useContext } from "react";

import { AuthContext } from "../../context/authentication-context";
import MainBodyLayout from "./main-body-layout";
import Header from "../header/header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
	children: JSX.Element | JSX.Element[];
}

export default function Main({ children }: LayoutProps): JSX.Element {
	const { user, login, logout, sessionCheckStatus } = useContext(AuthContext);
	// 767px
	return (
		<div
		 >
			<Header/>
			
					<MainBodyLayout>{children}</MainBodyLayout>

		</div>
	);
}
