import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  modify?: boolean;
  nameClass?: string;
}

const Input: React.FC<InputProps> = ({ label, name, modify, nameClass, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label> 
      <input 
      	type="text" 
      	id={name} 
      	className={modify? `${nameClass}` : ''}
      	{...rest} 
      />
    </div>
  );
}

export default Input;
