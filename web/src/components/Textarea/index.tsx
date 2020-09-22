import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  alert?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, alert, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <label className="textarea-alert">{alert}</label>
      <textarea id={name} {...rest} />
    </div>
  );
}

export default Textarea;
