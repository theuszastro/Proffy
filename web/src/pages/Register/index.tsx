import React, { useState, useRef, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 

import api from '../../services/api';

import Back from '../../assets/images/icons/back.svg';
import LogoProffy from '../../assets/images/logo.svg';

import ProffySuccess from '../../components/ProffySuccess';
import ProffyLogo from '../../components/ProffyLogo';

import './style.css';

const Register: React.FC = () => {
	const [nome, setNome] = useState('');
	const [sobrenome, setSobrenome] = useState('');
	const [Photo, setPhoto] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const history = useHistory();

	const [Active, setActive] = useState(false);
	const [Success, setSuccess] = useState(false);
	const senhaRef = useRef<HTMLInputElement>(null);

	const InputChange = () => {
		Active? setActive(false) : setActive(true);

		if(!Active){
			senhaRef.current?.setAttribute('type', 'text');
		} else {
			senhaRef.current?.setAttribute('type', 'password');
		}
	}

	const CreateRequest = async (event: FormEvent) => {
		event.preventDefault();

		const [, one] = email.split('@');

		if(!nome){
			window.alert('Digite seu nome');

			return;
		}

		if(!sobrenome){
			window.alert('Digite seu sobrenome');

			return;
		}

		if(!Photo){
			window.alert('Digite o link da sua foto');

			return;
		}

		if(!email){
			window.alert('Digite seu email');

			return;
		}

		if(!one){
			window.alert('Email Invalido');

			return;
		}

		const [, three] = one.split('.');

		if(!three){
			window.alert('Email invalido');

			return;
		}

		const EmailFormated = email.toLowerCase();

		if(!senha){
			window.alert('Digite sua senha');

			return
		}

		if(senha.length < 5){
			window.alert('Senha deve conter 6 caracteres');
			return;
		}

		await api.post('/register', {
			nome,
			sobrenome,
			photo: Photo,
			email: EmailFormated,
			password: senha
		})
			.then(response => console.log(response))
			.catch(err => console.log(err));

		setSuccess(true);
	}
 
	return (
		<div className="container-complete-register">
			<div className="container-register">
				<div className="register">
					<div className="image-container hidden">
						<img 
							style={{
								cursor: 'pointer',
							}}
							src={Back}
							onClick={() => history.goBack()}
							className="goBack"
						/>

						<img src={LogoProffy} className="LogoHidden" />
					</div>
					
					<form className="register">
						<img 
							style={{
								cursor: 'pointer',
							}}
							src={Back}
							onClick={() => history.goBack()}
							className="goBack"
						/>

						<h1 className="title">Cadastro</h1>

						<p className="description">
							Preencha os dados abaixo {'\n'}
							para começar.
						</p>

						<div className="container-input-register nome">
							<div className={nome.length >= 1? 'container-input nome' : 'container-input nome active'}>
								<input 
									type="text"
									value={nome}
									onChange={e => setNome(e.target.value)}
									className="register-nome input-register"
								/>
							</div>
						</div>

						<div className="container-input-register sobrenome">
							<div className={sobrenome.length >= 1? 'container-input sobrenome' : 'container-input sobrenome active'}>
								<input 
									type="text"
									value={sobrenome}
									onChange={e => setSobrenome(e.target.value)}
									className="register-sobrenome input-register"
								/>
							</div>
						</div>

						<div className="container-input-register photo">
							<div className={Photo.length >= 1? 'container-input photo' : 'container-input photo active'}>
								<input 
									type="text"
									value={Photo}
									onChange={e => setPhoto(e.target.value)}
									className="register-photo input-register"
								/>
							</div>
						</div>

						<div className="container-input-register email">
							<div className={email.length >= 1? 'container-input email' : 'container-input email active'}>
								<input 
									type="text"
									value={email}
									onChange={e => setEmail(e.target.value)}
									className="register-email input-register"
								/>
							</div>
						</div>

						<div className="container-input-register senha">
							<div className={senha.length >= 1? 'container-input senha' : 'container-input senha active'}>
								<input
									type="password"
									ref={senhaRef}
									value={senha}
									onChange={e => setSenha(e.target.value)}
									className="register-password input-register"
								/>

								{
									Active? 
										<AiOutlineEyeInvisible 
											size={25} 
						                    color="#6842C2"
						                    className="togglePassword"
						                    onClick={InputChange}
										/>
									: 
										<AiOutlineEye 
											size={25} 
						                    color="rgba(0, 0, 0, .4)" 
						                    className="togglePassword"
						                    onClick={InputChange}
										/>
								}
							</div>
						</div>
						

						<button 
							className="submit-register"
							onClick={CreateRequest}
						>
							Concluir Cadastro
						</button>
					</form>
				</div>

				<div className="ProffyLogo">
					<ProffyLogo nameClass={Success? 'none' : ''} />
				</div>
			</div>		

			{
				Success? (
					<ProffySuccess  
						title={'Cadastro Concluido'}
						description={`Agora você faz parte da plataforma da Proffy | Tenha uma ótima experiência.`}
						label={'Fazer login'}
						To="login"
					/>
				) : null
			}
		</div>
	);
}

export default Register;