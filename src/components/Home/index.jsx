import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import BackgroundLeft from '../../shared/images/image-home-sx.jpg';

//import { Slide } from 'react-slideshow-image';   DEPRECATED
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: -150
  },
  card: {
    marginTop: 150,
    //marginBottom: 40,
    //minWidth: 275,
    //minHeight: 650,
    //padding: theme.spacing.unit * 2,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
  },
  gridLeft: {
    //backgroundImage: `url(${BackgroundLeft})`,
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`,
    backgroundColor: 'transparent',
    height: '100%',
  },
  cardContent2: {
    padding: 0, paddingBottom: '0px !important',
  },
  spacer: {
    minHeight: 100,
  },

  title: {
    fontSize: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 40,
    marginBottom: 30,
    color: 'rgb(255,255,255,0.9)',   
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
    color: 'rgb(255,255,255,0.6)', 
  },
  registerButton: {
    textDecoration: 'none',
  }, 
  register: {
    color: '#fff',
    fontSize: 15,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 4,
    border: 2,
    marginTop:40,
  },
});

const properties = {
  showArrows:false, showStatus:false, showIndicators:false, showThumbs:false,
  infiniteLoop:true, stopOnHover:false,emulateTouch:true,
  transitionTime: 250, interval:2000, 
}


class Home extends Component {
  state = {
    email:'',
    firstName:'',
    middleName:'',
    surname:'',
    token:0,
    categories: [],
  };

  componentDidMount () { 
    
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
    
    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ categories: res }) 
      }) 
      
  }

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

    const { classes } = this.props;

    let categories = this.state.categories.map ((category, index) => {       
      return <div key={index}> 
                <img src={category._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} />
                <span className="legend" style={{backgroundColor: category.acf.category_color}}> {category.acf.category_name} </span> 
              </div> 
    });

    console.log(categories);

    return (
      <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}  className={classes.gridLeft}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1}>

                  <div className={classes.spacer}></div>

                  <Typography className={classes.subtitle}>
                  WELCOME TO THE TOKEN HOLDERS DASHBOARD
                  </Typography>            
                  
                  <Typography className={classes.pos}>
                  TOKENs HOLD: 12569.457<br /><br />
                  LOOK SCORE: 125.69457
                  </Typography>                 
                  
                  <br />

                  <a href="https://www.looklateral.com/LLWhitePaper.pdf" target="_blank" className={classes.registerButton}>
                    <Button className={classes.register}>WHITE PAPER</Button>
                  </a>

                  <div className={classes.spacer}></div>
                  
                </CardContent>
              </Card>
          </Grid>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent2}>
                    
                    <Carousel autoPlay {...properties}>
                      {categories}               
                    </Carousel>
                  
                </CardContent>
              </Card>
          </Grid>
      
      </Grid>
      </div>
    );
  }
}
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Home);
  