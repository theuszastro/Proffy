import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Background from '../../assets/images/success-background.svg';
import Check from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

interface SucessProps {
	title: string;
	description: string;
	label: string;
	To: string;
} 

const Sucess: React.FC<SucessProps> = ({ title, description, label, To }) => {
	const history = useHistory();

	const [largura, setLargura] = useState(window.innerWidth <= 450);

	const [one, two] = description.split('|');

	const Body = document.querySelector('body')!;

	document.body.onresize = function () {
		if(window.innerWidth <= 450){
			setLargura(true);
		} else {
			setLargura(false);
		}
	}

	Body.classList.add('hidden');

	return (
		<div className="sucess-register">
			<img src={Background} className="background" />
			
			<div className="sucess-center">
				<img src={Check} />

				<h1 className="title-banner">{title}</h1>
				<p className="description">
					{one} {largura? null : <br /> }
					{two}
				</p>
				<button className="irLogin" onClick={() => {
					history.push(`/${To}`)

					Body.classList.remove('hidden');
				}}>{label}</button>

			</div>
		</div>
	);
}

export default Sucess;