import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
 
import LogoProffy from '../../assets/images/logo.svg';
import Back from '../../assets/images/icons/back.svg';
import Rocket from '../../assets/images/icons/rocket.svg';
import Happy from '../../assets/images/icons/smile.svg';

import './styles.css';

interface Props {
	title: string;
	label: string;
	icon: string;
	section: string;
	description?: string;
	isClass?: boolean;
}

const ProffyHeader: React.FC<Props> = ({ title, label, icon, section, description, isClass }) => {
	const history = useHistory(); 

	const [title1, title2] = title.split('|');
	const [label1, label2] = label.split('|');
	const [description1, description2] = title.split('|');

	return (
		<header className="headerProffy">
	        <div className="headerProffy-submenu">
		        <div 
		            className="headerProffy-voltar"
		            onClick={() => history.goBack()}
		        >
		        	<img src={Back} alt="Voltar" className="headerProffy-goBack" /> 
		        </div>

		        <div className="headerProffy-section">
		            <h1 className="headerProffy-title">{section}</h1>
		        </div>

		        <div className="headerProffy-logo">
		            <img src={LogoProffy} alt="Logo" className="headerProffy-image" />
		        </div>
	        </div>

	        <div className="headerProffy-container">
		        <div className="headerProffy-content">
		            <h1 className="headerProffy-title">
		            	{title1} <br />
		            	{title2}
		            </h1>

		            {
		            	description? (
		            		<p className="headerProffy-description">
				            	{description1} <br />
				            	{description2}
				            </p>
		            	) : null
		            }
		        </div>

		        <div className={isClass? 'headerProffy-details description': 'headerProffy-details'}>
		            <img src={icon === 'rocket'? Rocket : Happy} alt="Carinha" className="headerProffy-emoji" />

		            <p className="headerProffy-tamanho">
		            	{label1} <br />
		            	{label2}
		            </p>
		        </div>
	        </div>
	      </header>
	);
}

export default ProffyHeader;