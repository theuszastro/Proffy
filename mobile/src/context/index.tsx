import React, { useState, createContext, useContext } from 'react';

import { TeacherProps } from '../pages/Teacher/TeacherList';

interface UserProps {
    id: string | number;
	nome: string;
	sobrenome: string;
	email: string;
	photo: string;
}

interface DadosProps {
    nome: string;
    sobrenome: string;
    foto: string;
}

type ContextoProps = {
    User: UserProps;
    setUser: any;

    Dados: DadosProps;
    setDados: any;

    Favorites: TeacherProps[];
    setFavorites: any;

    FavoritesIds: number[];
    setFavoritesIds: any;
}

const Contexto = createContext<Partial<ContextoProps>>({});

const ContextoProvider: React.FC = ({ children }) => {
    const [User, setUser] = useState<UserProps>();
    const [Dados, setDados] = useState<DadosProps>();
    const [Favorites, setFavorites] = useState();
    const [FavoritesIds, setFavoritesIds] = useState([]);
    
    return (
        <Contexto.Provider
            value={{
                User, setUser,
                Dados, setDados,
                Favorites, setFavorites,
                FavoritesIds, setFavoritesIds
            }}
        >
            {children}
        </Contexto.Provider>
    );
}

export function useProfile () {
    const context = useContext(Contexto);
    const { User, setUser } = context;

    return { User, setUser };
}

export function useRegister () {
    const context = useContext(Contexto);
    const { Dados, setDados } = context;

    return { Dados, setDados };
}

export function useFavorites () {
    const context = useContext(Contexto);
    const { Favorites, setFavorites, FavoritesIds, setFavoritesIds } = context;

    return { Favorites, setFavorites, FavoritesIds, setFavoritesIds };
}



export default ContextoProvider;