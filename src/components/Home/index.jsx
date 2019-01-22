import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import Background from '../../shared/images/bg_kyc/14122018-01.JPG';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop: -150
  },
  card: {
    marginTop: 210,
    marginBottom: 40,
    minWidth: 275,
    minHeight: 650,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  title: {
    fontSize: 20,
    color: '#00f',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: 'rgb(0,0,0,0.9)',   
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
    color: 'rgb(0,0,0,0.54)',
  },
  registerButton: {
    textDecoration: 'none',
  }, 
  register: {
    color: '#000',
    fontSize: 15,
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: 4,
    border: 2,
    marginTop:40,
  },
});


class Home extends Component {
  state = {
    email:'',
    firstName:'',
    middleName:'',
    surname:'',
    token:0,
  };

  /*getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    console.log(response);
    if(response){
      if(response.step1 === true) {
        this.setState({
          url: '/dashboard',
          label: 'Dashboard',
        });

      } else {
        this.setState({
          url: '/register',
          label: 'Register',
        });
      }
    }
  } */
  

  render() {

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
  
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
      <Card className={classes.card}>           
        <CardContent>
        
          <Typography className={classes.subtitle}>
          WELCOME TO THE TOKEN HOLDERS DASHBOARD
          </Typography>

          
          <Typography className={classes.pos}>
          TOKENs HOLD: 12569.457<br /><br />
          LOOK SCORE: 125.69457
          </Typography>
          
          <br /><br />

          <a href="" target="_blank" className={classes.registerButton}>
            <Button className={classes.register}>WHITE PAPER</Button>
          </a>
          
        </CardContent>
      </Card>
      </Grid>
      <Grid item xs></Grid>
      </Grid>
      </div>
    );
  }
}
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Home);
  