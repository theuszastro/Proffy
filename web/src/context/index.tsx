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
}

const ContextApplication = createContext<Partial<ContextProps>>({});

const ContextProvider: React.FC = ({ children }) => {
	const [User, setUser] = useState<Props>();

	return (
		<ContextApplication.Provider
			value={{
				User, setUser
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

export default ContextProvider;