import React/*, { Component }*/ from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
//import { Auth } from 'aws-amplify';
import BackgroundLeft from '../../shared/images/image-home-sx.jpg';

//import { Slide } from 'react-slideshow-image';   DEPRECATED
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const styles = {
  root: { flexGrow: 1, marginTop: -150 },
  card: {
    height: 'calc(100% - 150px)',
    overflow: '',
    marginTop: 150, //marginBottom: 40, minWidth: 275, minHeight: 650,
    padding: 0,//padding: theme.spacing.unit * 2,
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { padding: 0, paddingBottom: '0px !important', height: '100%', },
  spacer: { minHeight: 100, },
  subtitle: {
    fontSize: 40, marginBottom: 30,
    color: 'rgb(255,255,255,0.9)',   
  },
  pos: {
    fontSize: 20, color: 'rgb(255,255,255,0.6)', 
    marginBottom: 10, marginTop: 40, 
  },
  registerButton: { textDecoration: 'none', }, 
  register: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#fff', borderRadius: 4, border: 2,
  },
  spanColored: {
    fontSize: 80, padding: 20, opacity: 0.8,
    width: '100%', height: 200, bottom: 0, left: 0,
    position: 'absolute',
  },
  textSpanColored: { textDecoration: 'none', color: '#fff', },
}

const properties = {
  showArrows:false, showStatus:false, showIndicators:false, showThumbs:false,
  infiniteLoop:true, stopOnHover:false,emulateTouch:true,
  transitionTime: 250, interval:2000, autoPlay: true,
}


const Home = (props) => {
  
    const { classes } = props;
    const { userState } = props;
    
    let categories = userState.categories.map ((category, index) => {       
      return <div key={index} style={{ height: userState.viewport.height-260 }}> 
                <img 
                    src={category._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                    height={(userState.viewport.height -260)}
                    alt={category.acf.category_name} />
                <span className={classes.spanColored} style={{backgroundColor: category.acf.category_color}}>
                  <a 
                      href={category.acf.category_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={classes.textSpanColored}>
                  {category.acf.category_name}</a>
                </span> 
              </div> 
    });

    //let llToken = userState.llToken ? userState.llToken : 0;
    let holdingDays = userState.investDate !== false ? Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(userState.investDate)) / (1000 * 60 * 60 * 24)) : 0;
    //let llScore = llToken * holdingDays; 

    return (  
    
    <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >
                  
                  <div className={classes.spacer}></div>

                  
                    <Typography className={classes.subtitle}>
                    WELCOME TO THE TOKEN HOLDERS DASHBOARD
                    </Typography>            
                    
                    { userState.userLoaded === false ? (

                        userState.userActive === true ? null : (
                          
                          <div>
                            
                            <Typography className={classes.pos}>
                              It seems that you didn't perform our kyc...
                            </Typography>   

                            <br />

                            <a 
                              href="https://xbr.brightcoin.us/signup?coinId=fd6aa11a-2cb9-4272-b37f-9d0f0e0ab953" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={classes.registerButton}
                            >
                                <Button className={classes.register}>Look Lateral KYC</Button>
                            </a>

                          </div>
                        )

                    ) : (
                      
                      <div>
                        <Typography className={classes.pos}>
                          TOKENs HOLD: {userState.llToken}<br /><br />
                          HOLDING DAYS: {holdingDays}<br /><br />
                          LOOK SCORE: {userState.llScore}
                        </Typography>   
                        
                        <br />

                        <a 
                          href="https://www.looklateral.com/LLWhitePaper.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={classes.registerButton}
                        >
                          <Button className={classes.register}>WHITE PAPER</Button>
                        </a>
                      </div>

                    )}              
                    
                    { /* <div className={classes.spacer}></div> */ }

                    { userState.llRegistered ? (
                        
                        <div>
                          <Typography className={classes.pos}>
                          YOU ARE A LOOK LATERAL USER SINCE <br /> {userState.registrationDate}
                          </Typography>                                        
                        </div>

                    ) : (

                      userState.userActive ? (
                          <div>
                            <Typography className={classes.pos}>
                            Don't waste time, register to Look Lateral Platform
                            </Typography>                                        
                            <br />  
                            <Link className={classes.registerButton} to='/register'>
                              <Button className={classes.register}>REGISTER</Button>
                            </Link>
                          </div>
                      ) : null

                    )}
                  
                </CardContent>
              </Card>
          </Grid>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent2}>
                    
                    <Carousel autoPlay {...properties}>
                      { categories }               
                    </Carousel>
                  
                </CardContent>
              </Card>
          </Grid>
      
      </Grid>
      </div>
    )
  }
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Home);
  