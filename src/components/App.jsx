import React from 'react';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';

//import Amplify, { Auth } from 'aws-amplify';
/*import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);*/

class App extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      email:'', firstName:'', middleName:'', surname:'',
      llToken:0, llScore:0,
      cognitoLogged: false, kycCompleted: false, llRegistered: false, 
      categories: [],
      viewport: { width: 0, height: 0, },
    }
  }*/

  /*componentWillMount () { 
    
    if( this.state.email === ''){     
      Auth.currentAuthenticatedUser({
        bypassCache: false
      }).then(user => {       
        if(this.state.email !== user.attributes.email)
          this.setState({
            email: user.attributes.email,
            cognitoLogged: true,
          } 
         // , function () { console.log('app.js state:\n' + JSON.stringify(this.state)); }
           );
        //this.getUser();
      })
      .catch(err => console.log(err));  
    } else {
      //this.getUser();
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
  }*/
    
  /*getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    //if(response) console.log (JSON.stringify(response));

    if(response.firstName && response.surname && this.state.firstName !== response.firstName && this.state.surname !== response.surname) { //enough to say step1 done
      this.setState({    
          ...
      });
    }

  }*/
  
  render() {

    const userState = this.props.userState;
    
    if (this.props.authState === "signedIn") {
      return (
        
        <div className="App">
          <Header userState={userState} />
          <Content children={this.props.children} />            
          <Footer userState={userState} />
        </div>
      );
    } else {
      return null;
    }
  }

}

//export default withAuthenticator (App);
export default App;
