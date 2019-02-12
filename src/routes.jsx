// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import Sidebar from './shared/components/layout/Sidebar';
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

import aws_exports from './aws-exports';
import Amplify, { Auth, API } from 'aws-amplify';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


Amplify.configure(aws_exports);
library.add(fab, fas);

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
  default: bg=bg1; bgc='linear-gradient(to bottom right, #bbbf56,#d85b5b)'; break;
} 

const MySectionContainer = Object.assign({}, AmplifyTheme.sectionContainer, { // page container
          padding: 0,})
const MyFormContainer = Object.assign({}, AmplifyTheme.formContainer, { // form container
          backgroundImage: `url(${bg}), ` + bgc,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
          minHeight: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth,
          margin: 0,})
const MyFormSection = Object.assign({}, AmplifyTheme.formSection, { // form
          marginTop: 150, 
          marginBottom: 50,
          border: 0,
          //boxShadow: 'none',
          backgroundColor:'#1A1B1D',})
const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, {
          fontSize: 33,
          backgroundColor:'transparent',})
const MySectionBody = Object.assign({}, AmplifyTheme.sectionBody, {
          marginTop: '-20px',})
const MySectionFooter = Object.assign({}, AmplifyTheme.sectionFooter, {
          backgroundColor:'transparent',
          borderTop: 0,
          marginTop: '-30px',})
const MySectionFooterPrimaryContent = Object.assign({}, AmplifyTheme.sectionFooterPrimaryContent, {
          position: 'relative',
          right: 100,})
const MySectionFooterSecondaryContent = Object.assign({}, AmplifyTheme.sectionFooterSecondaryContent, {
          display: 'none',})

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

/*const AppRoutes = () => (
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
*/

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      cognitoLogged: false, userLoaded: false, userActive: true, user:false, userType: 0,

      email:'', firstName:'', middleName:'', lastName:'', dateBirth:'',
      address:'', city:'', zipCode:'', regionState:'',
      countryCitizenship:'', countryResidence:'',
      occupation:'', accreditedInvestor: false,
      
      kycCompleted: false, kycDate: false, kycDateUpdate: false,
      llToken:0, llScore:0, investDate: false,
      llRegistered: false, registrationDate: false, registrationDateUpdate: false,

      categories: [],
      viewport: { width: 0, height: 0, },
      sidebarOpened: false,
    }
    
    this.getUser = this.getUser.bind(this);
    this.resize = this.resize.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleChangeRegistrationField = this.handleChangeRegistrationField.bind(this);
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
  }

  /* 
  ***  ZU NOTES  *** 
  - when a user complete the brightcoin kyc we have to put his email and his amount in db
[record to put in db: email, llToken, llScore, investDate, kycCompleted, kycDate, kyvDateUpdate]
  - when a user register or login in cognito, we get the user from the db
  - if email is in db he can proceed and the left message is welcome, otherwise left message "not your time"
  - he must register, very similar to our old prekyc
  - he can access to the platform ...
  */

  getUser = async () => {
    const response = await API.get('dashboardAPI', '/items/' + this.state.email);
    if(response){
      if(this.state.userLoaded === false) { 
        let holdingDays = Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(response[0].investDate)) / (1000 * 60 * 60 * 24));
        let llScore = response[0].llToken * holdingDays; 
        
        if(response[0].firstName === '' || response[0].lastName === '' || response[0].llToken === '' || response[0].investDate === ''){
          this.setState({ userActive: false });
        }
        else {
          this.setState({   
            userLoaded: true,    
            firstName: response[0].firstName, middleName:response[0].middleName, lastName: response[0].lastName, dateBirth: response[0].dateBirth,
            address:response[0].address, city:response[0].city, zipCode:response[0].zipCode, regionState:response[0].regionState,
            countryCitizenship:response[0].countryCitizenship, countryResidence:response[0].countryResidence,
            occupation:response[0].occupation, accreditedInvestor: response[0].accreditedInvestor,        
            kycCompleted: response[0].kycCompleted, kycDate: response[0].kycDate, kycDateUpdate: response[0].kycDateUpdate,
            llToken: response[0].llToken, investDate: response[0].investDate, llScore: llScore,
            llRegistered: response[0].llRegistered, registrationDate: response[0].registrationDate, registrationDateUpdate: response[0].registrationDateUpdate,
          },  function () { console.log('routes.js getUser:\n' + JSON.stringify(this.state)); });
        }
      }
    } else this.setState({ userActive: false });
  }

  resize = () => {
    if(this.state.viewport.width !== document.documentElement.clientWidth || this.state.viewport.height !== document.documentElement.clientHeight){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
      }, function () { this.forceUpdate() }); 
    }
  }

  handleSidebar = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened })
  }

  handleChangeRegistrationField = name => event => { this.setState({ [name]: event.target.value }); };
  
  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    this.post();
    console.log('posting');
  }

  post = async () => {
    console.log('calling api');

  if(this.state.firstName==='' || this.state.lastName==='' || 
      this.state.address==='' || this.state.city==='' || this.state.zipCode==='' || this.state.regionState==='' || 
      this.state.countryCitizenship==='' || this.state.countryResidence==='' || 
      this.state.dateBirth==='' || this.state.occupation==='' || 
      /*this.state.amount==='' ||*/ this.state.accreditedInvestor===''){
        alert('Please complete all required fields'); 
        return false;

  } else {
    
    const response = await API.post('dashboardAPI', '/items/', {
      body: {
        
        user_email:this.state.email,
        firstName:this.state.firstName,
        middleName:this.state.middleName || null,
        lastName:this.state.lastName,          
        address:this.state.address,
        city:this.state.city,
        zipCode:this.state.zipCode,
        regionState:this.state.regionState,
        countryCitizenship:this.state.countryCitizenship,
        countryResidence:this.state.countryResidence,
        dateBirth:this.state.dateBirth,
        occupation:this.state.occupation,  
        //amount:this.state.amount,  
        accreditedInvestor:this.state.accreditedInvestor, 
        kycCompleted: this.state.kycCompleted, kycDate: this.state.kycDate, kycDateUpdate: this.state.kycDateUpdate,
        llToken:this.state.llToken, llScore:this.state.llScore, investDate: this.state.investDate,
        llRegistered: true, registrationDate: Date('Y-m-d'), registrationDateUpdate: Date('Y-m-d'), 
      }
    });      
    //console.log('put response:\n' + JSON.stringify(response));
    this.setState({
      llRegistered: true, 
      registrationDate: Date('Y-m-d'), 
      registrationDateUpdate: Date('Y-m-d')    
    }, function () {
      window.location.href='/';
      //console.log('update state after post:\n' + JSON.stringify(this.state)); 
    });
  }
  }

  componentDidMount() { window.addEventListener('resize', this.resize); }
  componentWillUnmount() { window.removeEventListener('resize', this.resize); }

  componentWillMount () { 
    
    if( this.state.email === ''){     
      Auth.currentAuthenticatedUser({
        bypassCache: false
      }).then(user => {       
        if(this.state.email !== user.attributes.email)
          this.setState({
            email: user.attributes.email,
            cognitoLogged: true,
            userType: 3, // ZUNOTE: make it dynamic
          } , 
          function () { 
            console.log('routes.js get cognito user:\n' + JSON.stringify(this.state)); 
            this.getUser();
          });
        
      })
      .catch(err => console.log(err));  
    } else {
      this.getUser();
    }

    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ categories: res }); 
      }) 

    if(this.state.viewport.width !== document.documentElement.clientWidth){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
      }); 
    }
  }
  
  render() {

    return (
      <Authenticator theme={MyTheme} hideDefault={true}>
        <SignIn/>
        <ConfirmSignIn/>
        <RequireNewPassword/>
        <SignUp/>
        <ConfirmSignUp/>
        <VerifyContact/>
        <ForgotPassword/>
        <TOTPSetup/>
        
        <App userState={this.state} handleSidebar={this.handleSidebar}>
          <Switch>
            <Route path="/" exact render={(props) => <Home userState={this.state} {...props} /> } />
            <Route path="/register" exact render={(props) => <Register 
                                                              userState={this.state} 
                                                              handleChangeRegistrationField={this.handleChangeRegistrationField}
                                                              handleRegistrationSubmit={this.handleRegistrationSubmit}
                                                              {...props} /> } />
            <Route path="/profile" exact render={(props) => <Profile userState={this.state} {...props} /> } />
            <Route component={Error404} />
          </Switch>

          <Sidebar 
                    isOpen={this.state.sidebarOpened}
                    cognitoLogged={ this.state.cognitoLogged} 
                    userType={ this.state.userType}
                /> 
        </App>
      </Authenticator>
    )
  }
}
export default AppRoutes;    
  