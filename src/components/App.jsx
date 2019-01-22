import React from 'react';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';
import aws_exports from '../aws-exports';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure(aws_exports);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      firstName:'',
      middleName:'',
      surname:'',
      token:0,
    }
  }

  /*getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    //if(response) console.log (JSON.stringify(response));

    //check if registered
    if(response.firstName && response.surname && this.state.firstName !== response.firstName && this.state.surname !== response.surname) { //enough to say step1 done
      this.setState({    // we don't need to set all the state!!      
        step1:true,
        firstName:response.firstName,
        middleName:response.middleName,
        surname:response.surname,
        countryCitizenship:response.countryCitizenship,
        countryResidence:response.countryResidence,
        accreditedInvestor:response.accreditedInvestor,
        amount:response.amount,
      });
    }

  }*/
  

  render() {
    
    if( this.state.email === ''){
      
      Auth.currentAuthenticatedUser({
        bypassCache: false
      }).then(user => {
        
        if(this.state.email !== user.attributes.email)
          this.setState({
            email: user.attributes.email
          });
        //this.getUser();
      })
      .catch(err => console.log(err));
   
    } else {
      //this.getUser();
    }

    if (this.props.authState === "signedIn") {
      return (
        
        <div className="App">
          <Header userState={this.state} />

          <Content children={this.props.children} />
            
          <Footer  userState={this.state} />
        </div>
      );
    } else {
      return null;
    }
  }

}

//export default withAuthenticator (App);
export default App;
