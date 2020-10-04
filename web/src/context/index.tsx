import React, { createContext, useState, useContext } from 'react';

interface Props {
	id: string | number;
	nome: string;
	sobrenome: string;
	email: string;
	photo: string;
}

type ContextProps = {
	User: Props;
	setUser: any;

	Mostrar: boolean;
	setMostrar: any;

	Login: boolean;
	setLogin: any;
}

const ContextApplication = createContext<Partial<ContextProps>>({});

const ContextProvider: React.FC = ({ children }) => {
	const [User, setUser] = useState<Props>();
	const [Mostrar, setMostrar] = useState(false);
	const [Login, setLogin] = useState(false);

	return (
		<ContextApplication.Provider
			value={{
				User, setUser,
				Mostrar, setMostrar,
				Login, setLogin
			}}
		>
			{children}
		</ContextApplication.Provider>
	)
}

export function useProfile(){
	const context = useContext(ContextApplication);
	const { User, setUser } = context;

	return { User, setUser };
}

export function useLanding(){
	const context = useContext(ContextApplication);
	const { Mostrar, setMostrar, Login, setLogin } = context;

	return { Mostrar, setMostrar, Login, setLogin };	
}

export default ContextProvider;