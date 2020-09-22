import React, { useState, useEffect, FormEvent, useRef, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheck, AiOutlineReload, AiOutlineClose } from 'react-icons/ai'; 
import { FaCheck } from 'react-icons/fa'; 

import { useProfile } from '../../context';

import Back from '../../assets/images/icons/back.svg';
import ProffyLogo from '../../components/ProffyLogo';
import Corazom from '../../assets/images/icons/purple-heart.svg';
import LogoProffy from '../../assets/images/logo.svg';

import api from '../../services/api';

import './style.css';

const Login: React.FC = () => {
  const history = useHistory();
  const { User, setUser } = useProfile();

  const passwordRef = useRef<HTMLInputElement>(null);

  const [Email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const [ButtonActive, setButtonActive] = useState(false);
  const [onVisible, setonVisible] = useState(false);
  const [Active, setActive] = useState(false);

  const [Clicked, setClicked] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [ErrorLogin, setErrorLogin] = useState(false);

  const makeError = () => {
    const getButton = document.querySelector('.button-submit-login')!;

    getButton.classList.remove('active');
    getButton.classList.add('error');

    setLoading(false);
    setClicked(true);
    setErrorLogin(true);
  }

  const CheckInfo = () => {
    const [zero, one] = Email.split('@');
    
    if(ErrorLogin){
      const getButton = document.querySelector('.button-submit-login')!;

      getButton.classList.remove('error');
      getButton.classList.add('active');

      setLoading(false);
      setClicked(false);
      setErrorLogin(false);
    }

    if(!one){
      setButtonActive(false);

      return;
    }

    const [two, three] = one.split('.');

    if(!two || !three){     
      setButtonActive(false);

      return;
    }
    
    if(senha.length < 5){        
      setButtonActive(false);
      
      return;
    }

    setButtonActive(true);
  }

  const ChangeInput = () => {
    onVisible? setonVisible(false) : setonVisible(true);
 
    if(!onVisible){
      passwordRef.current?.setAttribute('type', 'text');
    } else {
      passwordRef.current?.setAttribute('type', 'password');
    }
  }

  const Authenticate = async (event: FormEvent) => {
    event.preventDefault();

    if(!ButtonActive)
      return;

    const [, zero] = Email.split('@');
    if(!zero){
      window.alert('Email Invalido');

      return;
    }

    const [one, two] = zero.split('.');

    if(!one || !two){
      window.alert('Email Invalido');
         
      return;
    }
    
    if(senha.length === 0){
      window.alert('Digite sua senha');

      return;
    }

    if(senha.length < 6){
      window.alert('Senha deve conter 6 caracteres');

      return;
    }

    if(ErrorLogin){
      const getButton = document.querySelector('.button-submit-login')!;

      getButton.classList.remove('error');
      getButton.classList.add('active');

      setLoading(false);
      setClicked(true);
      setErrorLogin(false);
    }

    setClicked(true);
    setLoading(true);

    const expires = Active? '99999d' : '1d'

    const ResponseApi = await api.post('login', { 
      email: Email, 
      password: senha, 
      expiresIn: expires
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return true;
      });

    if(ResponseApi === true){
      makeError();

      return;
    }

    const { id, token } = ResponseApi;

    const userDetails = await api.get(`/user/${id}`, {
      headers: {
        authorization: token
      }
    })
      .then(response => {
        return response.data.User[0];
      })
      .catch(err => {        
        makeError();

        console.log(err);
      });

    userDetails && setUser(userDetails);

    const localUser = localStorage.getItem('token');
    
    if(localUser)
      localStorage.removeItem('token');

    localStorage.setItem('token', ResponseApi.token);

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      history.push('/');
    }, 2000);
  }

  return (
    <div className="container-login">
      <div className="ProffyLogo">
        <ProffyLogo />
      </div>

      <div className="login-separation cinza form">
        <div className="menu-mobile">
          <img src={LogoProffy} className="LogoMenu" />
        </div>

        <form>
            <img 
              src={Back} 
              onClick={() => history.push('/')} 
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: 20
              }}
            />

            <h2>Fazer login</h2>

            <div className="input email-input">
              <div className={Email.length >= 1? 'email' : 'email noactive'}>
                <input
                  type="text" 
                  value={Email}
                  className="input-login email" 
                  onChange={e => {
                    setEmail(e.target.value);

                    CheckInfo();
                  }}
                /> 
              </div> 
            </div>
            
            <div className="input password-input">
              <div className={senha.length >= 1? 'senha' : 'senha noactive'}>
                <input 
                  ref={passwordRef}
                  value={senha}
                  type="password" 
                  className="input-login senha"
                  onChange={e => {
                    setSenha(e.target.value);

                    CheckInfo();
                  }}
                />

                {
                  onVisible? 
                    <AiOutlineEyeInvisible 
                      size={25} 
                      color="#6842C2"
                      className="togglePassword"
                      onClick={ChangeInput}
                    /> 
                  : 
                    <AiOutlineEye 
                      size={25} 
                      color="rgba(0, 0, 0, .4)" 
                      className="togglePassword"
                      onClick={ChangeInput}
                    />                  
                }           
              </div>
            </div> 

            <div className="form-options">
              <div className="container-checkbox">
                <div 
                  className={Active? 'checkbox active' : 'checkbox'}
                  onClick={() => setActive(!Active)}
                >
                  {
                    Active && <FaCheck size={12.5} color="#FFF" />
                  }
                </div>

                <p>Lembrar-me</p>
              </div>

              <Link to="/reset_password">
                Esqueci minha senha
              </Link>
            </div>

            <button 
              type="submit" 
              onClick={Authenticate}
              className={ButtonActive? 'button-submit-login active' : 'button-submit-login'}
            >
              {
                Clicked? null : 'Entrar' 
              }

              {
                Loading? <AiOutlineReload className="rotate" size={27} color="#FFF" /> : null
              }

              {
                Success? <AiOutlineCheck size={27} color="#FFF" /> : null
              }

              {
                ErrorLogin? <AiOutlineClose size={27} color="#FFF" /> : null
              }
            </button>

            <div className="separation-items">
              <div>
                <p>Não tem conta?</p>

                <Link to="/register">
                  Cadastra-se
                </Link>
              </div>

              <div>
                <p>
                  É de graça <img src={Corazom} />
                </p>
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login;