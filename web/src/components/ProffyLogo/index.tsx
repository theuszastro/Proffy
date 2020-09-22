import React from 'react';

import Background from '../../assets/images/success-background.svg';
import Logo from '../../assets/images/logo.svg';

import './style.css';

interface Props {
    nameClass?: string;
}

const ProffyLogo: React.FC<Props> = ({ nameClass }) => {
    return (
        <div className={`login-separation roxo ${nameClass}`}>
            <img src={Logo} alt="Proffy-logo" className="Logo" />
            <h2 className="slogan">
                Sua Plataforma de
                estudos online.
            </h2>

            <img src={Background} className="Background" />
        </div>
    );
}

export default ProffyLogo;