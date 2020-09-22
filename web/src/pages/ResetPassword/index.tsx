import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import goBack from '../../assets/images/icons/back.svg';
import LogoProffy from '../../assets/images/logo.svg';
import ProffyLogo from '../../components/ProffyLogo';
import ProffySucess from '../../components/ProffySuccess';

import api from '../../services/api';

import './style.css';

const ResetPassword: React.FC = () => {
	const history = useHistory();

	const [Email, setEmail] = useState('');
	const [Check, setCheck] = useState(false);
	const [Sucess, setSucess] = useState(false);
 
	const Recuperar = (e: FormEvent) => {
		e.preventDefault();

		if(!Check)
			return;

		setSucess(true);
	}

	const CheckEmail = () => {
		const [, one] = Email.split('@');

		setCheck(false);

		if(!one)
	    	return;

	    const [two, three] = one.split('.');

	    if(!two || !three)
	    	return;
		
		setCheck(true);
	}

	return (
		<>
			<div className="separation-reset">
				<div className="container-reset">
					<div className="form-container">
						<div className="image-reset hidden">
							<img 
								style={{
									cursor: 'pointer',
								}}
								src={goBack}
								onClick={() => history.push('/login')}
								className="goBackResetMenu"
							/>

							<img src={LogoProffy} className="HiddenLogo" />
						</div>

						<form className="reset">
							<img 
								src={goBack} 
								className="goBackReset" 
								onClick={() => history.goBack()} 
							/>

							<h1 className="reset-title">
								Eita, esqueceu
								sua senha?
							</h1>

							<p className="reset-label">
								Não esquenta, vamos dar um jeito nisso.
							</p>

							<div className="reset-container-input">
								<div className={Email.length < 1? 'reset-input active' : 'reset-input'}>
									<input 
										type="text" 
										value={Email}
										onChange={e => {
											setEmail(e.target.value);
											CheckEmail();
										}}
										className="reset-email"
									/>
								</div>
							</div>

							<button 
								type="submit"
								onClick={Recuperar}
								className={Check? 'reset-submit active' : 'reset-submit'}
							>
								Enviar
							</button>
						</form>
					</div>
				</div>

				<div className={Sucess? 'reset-proffy hide': 'reset-proffy'}>
					<ProffyLogo />
				</div>
			</div>

			{
				Sucess? (
					<ProffySucess 
						title="Redefinição enviada!"
						description="Boa, agora é so checar o e-mail que foi enviado para você | redefinir sua senha e aproveitar os estudos."
						label="Voltar ao login"
						To="login"
					/>
				) : null
			} 
		</>
	); 
}

export default ResetPassword;