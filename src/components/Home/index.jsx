import React/*, { Component }*/ from "react";
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
  cardContent2: { padding: 0, paddingBottom: '0px !important', },
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
    //console.log('Home props.userstate:\n' + JSON.stringify(userState));
    
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

    return (  <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >

                  <div className={classes.spacer}></div>

                  <Typography className={classes.subtitle}>
                  WELCOME TO THE TOKEN HOLDERS DASHBOARD
                  </Typography>            
                  
                  <Typography className={classes.pos}>
                  TOKENs HOLD: 12569.457<br /><br />
                  LOOK SCORE: 125.69457
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

                  <div className={classes.spacer}></div>
                  
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
  
  export default withStyles(styles)(Home);
  