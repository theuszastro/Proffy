import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ContextProvider from './context';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/ResetPassword';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes() {
  return (
	<ContextProvider>	
    	<BrowserRouter>
	    	<Route path="/" exact component={Landing} />
	    	<Route path="/login" component={Login} />
	    	<Route path="/register" component={Register} />
	    	<Route path="/reset_password" component={Reset} />
	    	<Route path="/study" component={TeacherList} />
	    	<Route path="/give-classes" component={TeacherForm} />
    	</BrowserRouter>
	</ContextProvider>
  );
}

export default Routes;