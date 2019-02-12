import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
  root: { flexGrow: 1/*, marginTop: -150*/, marginBottom: 50, },
  subtitle: {
    fontSize: 40, marginBottom: 30,
    color: '#000',   
  },
  registerButton: { textDecoration: 'none', }, 
  register: {
    color: '#000', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#000', borderRadius: 4, border: 2,
  },
}

const Profile = (props) => {
  
    const { classes } = props;
    const { userState } = props;

    return (  
    
        <div className={classes.root}>
      
          <Typography className={classes.subtitle}>
          CIAO { userState.firstName }
          </Typography>            
          
          <br />

          <Link className={classes.registerButton} to='/register'>
            <Button className={classes.register}>EDIT INFO</Button>
          </Link>

          { userState.userType === 3 || userState.userType === 2 ? (
              
              <div>
                <Link className={classes.registerButton} to='/'>
                  <Button className={classes.register}>UPLOAD ARTWORK</Button>
                </Link>  

                <br />

                <Link className={classes.registerButton} to='/'>
                  <Button className={classes.register}>FRACT ARTWORK</Button>
                </Link>  

              </div>

          ) :  null 
          }               
        
        </div>
    )
  }
  
  Profile.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Profile);
  