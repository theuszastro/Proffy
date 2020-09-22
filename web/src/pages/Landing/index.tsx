import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { useProfile } from '../../context';

import { AiOutlineLogin } from 'react-icons/ai';

import LogoImage from '../../assets/images/logo.svg';
import LandingImage from '../../assets/images/landing.svg';

import Study from '../../assets/images/icons/study.svg';
import Classes from '../../assets/images/icons/give-classes.svg';
import Heart from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';
  
import './styles.css';

const Landing: React.FC = () => {
	const token = localStorage.getItem('token');

	const { User, setUser } = useProfile();
	const history = useHistory();

	const [Connections, setConnections] = useState(0);

	const [Mostrar, setMostrar] = useState(false);
	const [Login, setLogin] = useState(false);
	const [tamanho, setTamanho] = useState(window.innerWidth >= 850); 

	const windowWidth = window.innerWidth;

	const getConnections = async () => {
		try {
			const Connections = await api.get('/connections')

			setConnections(Connections.data.total)
		} catch (err) {
			console.log(err);
		}
	}

	const validateToken = async () => {
		try {
			const id = await api.get('/auth', {
				headers: {
					'authorization': `Bearer ${token}`
				}
			});

			if(id.data.id){
				setLogin(true);

				setMostrar(true);
			}

			return id.data.id;
		} catch (err) {
			setLogin(false);

			setMostrar(true);
		}
	}

	const getUser = async () => {
		try {
			const id = await validateToken();

			const UserFind = await api.get(`/user/${id}`, {
				headers: {
					'authorization': `Bearer ${token}`
				}
			});

			setUser(UserFind.data.User[0]);

			getConnections();
		} catch (err) {
			console.log(err);
		}
	}

	document.body.onresize = function() {
		let Width = window.innerWidth; 

		if(Width >= 850){
			setTamanho(true);
		} else {
			setTamanho(false);
		}
	}

	useEffect(() => {
		if(!User)
			getUser();
	}, []);

	return (
		<div id="page-landing">
			<div className={Mostrar? 'page-color' : 'page-color cemporcento'}>
				{
					Mostrar? (
						<div>
							{
								Login? (
									<div className="profile-container">
										<div className="profile">
											<img src={User && User.photo} className="perfilPhoto" />
											<p className="profile-nome">{User && `${User.nome} ${User.sobrenome}`}</p>
										</div>
											
										<div className="profile-logoff">
											<AiOutlineLogin size={30} color="#f7f7f7" className="logoff" />
										</div>
									</div>
								) : (
									<div className="profile-container">
										<div className="profile"></div>

										<div className="profile-buttons">
											<Link to="/login" className="button-login">Login</Link>
											<Link to="/register" className="button-register">Cadastra-se</Link>
										</div>
									</div>
								)
							}
						</div>
					) : null
				}

				<div className="landing-container">
					<div className="landing-separation">
						<img src={LogoImage} alt="Logo" className="landing-logo" />
						<h1 className="landing-description">
							Sua plataforma de {tamanho? <br /> : false}
							estudos online.
						</h1>
					</div>

					<div className="landing-separation">
						<img src={LandingImage} alt="Landing Ilustration" className="landing-ilustration" />
					</div>	
				</div>
			</div>

			<div className="landing-content">
				<div className="landing-info">
					<p className="welcomeback"> 
						Seja bem-vindo {'  '} {tamanho? <br /> : null}
						<b>O que deseja fazer?</b>
					</p>

					<p className="totalConnections">
						Total de {Connections} conexões {tamanho? <br /> : null}
						já realizadas <img src={Heart} alt="Corazom roxo" className="corazom" />
					</p>
				</div>

				<div className="landing-container-buttons">
					<Link to="/study" className="study">
						<img src={Study} alt="Estudar" className="studyimg" />
						Estudar
					</Link>

					<Link 
						to={Login? '/give' : ''}
						onClick={() => Login? '': window.alert('É preciso fazer login')}
						className="give"
					>
						<img src={Classes} alt="Classe" className="giveimg" />
						Dar aulas
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Landing;