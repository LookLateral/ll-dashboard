// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Home from './components/Home';
import Error404 from './components/Error/404';
import { Authenticator, SignIn, ConfirmSignIn, RequireNewPassword, SignUp, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup } from 'aws-amplify-react';

import bg1 from './shared/images/bg-login/bg-login-01.png';
import bg2 from './shared/images/bg-login/bg-login-02.png';
import bg3 from './shared/images/bg-login/bg-login-03.png';
import bg4 from './shared/images/bg-login/bg-login-04.png';
import bg5 from './shared/images/bg-login/bg-login-05.png';
import bg6 from './shared/images/bg-login/bg-login-06.png';
import bg7 from './shared/images/bg-login/bg-login-07.png';
import bg8 from './shared/images/bg-login/bg-login-08.png';
import bg9 from './shared/images/bg-login/bg-login-09.png';
import bg10 from './shared/images/bg-login/bg-login-10.png';
import bg12 from './shared/images/bg-login/bg-login-12.png';

import { AmplifyTheme } from 'aws-amplify-react';

var rand = parseInt(Math.random() * 11);
var bg, bgc;

switch(rand) {
  case 0: bg=bg1; bgc='linear-gradient(to bottom right, #bbbf56,#d85b5b)'; break;
  case 1: bg=bg2; bgc='linear-gradient(to bottom right, #e89bef,#126477)'; break;
  case 2: bg=bg3; bgc='linear-gradient(to bottom right, #e0d9c6,#00848d)'; break;
  case 3: bg=bg4; bgc='linear-gradient(to bottom right, #afb983,#4e957f)'; break;
  case 4: bg=bg5; bgc='linear-gradient(to bottom right, #5e5c9b,#a47196)'; break;
  case 5: bg=bg6; bgc='linear-gradient(to bottom right, #4d48e0,#6141f1)'; break;
  case 6: bg=bg7; bgc='linear-gradient(to bottom right, #3448c4,#7288fd)'; break;
  case 7: bg=bg8; bgc='linear-gradient(to bottom right, #294b9a,#0677aa)'; break;
  case 8: bg=bg9; bgc='linear-gradient(to bottom right, #48a2b2,#b1d5d9)'; break;
  case 9: bg=bg10; bgc='linear-gradient(to bottom right, #ed7b60,#aa3d4e)'; break;
  case 10: bg=bg12; bgc='linear-gradient(to bottom right, #db1487,#e4646d)'; break;
  default:
    // code block
} 


console.log(AmplifyTheme);

const MySectionContainer = Object.assign({}, AmplifyTheme.sectionContainer, { // page container
          padding: 0,
})

const MyFormContainer = Object.assign({}, AmplifyTheme.formContainer, { // form container
          backgroundImage: `url(${bg}), ` + bgc,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
          minHeight: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth,
          margin: 0,
})
const MyFormSection = Object.assign({}, AmplifyTheme.formSection, { // form
          marginTop: 150, 
          marginBottom: 50,
          border: 0,
          //boxShadow: 'none',
          backgroundColor:'#1A1B1D',
})

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, {
          fontSize: 33,
          backgroundColor:'transparent',
})
const MySectionBody = Object.assign({}, AmplifyTheme.sectionBody, {
          marginTop: '-20px',
})
const MySectionFooter = Object.assign({}, AmplifyTheme.sectionFooter, {
          backgroundColor:'transparent',
          borderTop: 0,
          marginTop: '-30px',
})
const MySectionFooterPrimaryContent = Object.assign({}, AmplifyTheme.sectionFooterPrimaryContent, {
          position: 'relative',
          right: 100,
})
const MySectionFooterSecondaryContent = Object.assign({}, AmplifyTheme.sectionFooterSecondaryContent, {
          display: 'none',
})


const MyTheme = Object.assign( {}, AmplifyTheme, { 
          sectionContainer: MySectionContainer,
          formContainer: MyFormContainer,
          formSection: MyFormSection,
          sectionHeader: MySectionHeader,
          sectionBody: MySectionBody,
          sectionFooter: MySectionFooter,
          sectionFooterPrimaryContent: MySectionFooterPrimaryContent,
          sectionFooterSecondaryContent: MySectionFooterSecondaryContent,
          
});

const AppRoutes = () => (
  <Authenticator theme={MyTheme} hideDefault={true}>
    <SignIn/>
    <ConfirmSignIn/>
    <RequireNewPassword/>
    <SignUp/>
    <ConfirmSignUp/>
    <VerifyContact/>
    <ForgotPassword/>
    <TOTPSetup/>
    
    <App>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={Error404} />
      </Switch>
    </App>
  </Authenticator>
);

export default AppRoutes;
