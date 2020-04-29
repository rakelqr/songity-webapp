import React from 'react';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStylesHome } from '../utils/styles';
import Container from '@material-ui/core/Container';


const Home = () => {

  const classes = useStylesHome();

    return (
      <div>
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            We introduce you to Songity
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Songity is a little web app where you can create, store and edit your own songs.
            If you would like to use it, please create an account, or if you already have one, please, login.
        </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} justify="center" alignItems="flex-end">
            <Grid item xs={12} sm={8} md={6}>
              <CardContent>
                <Typography component="p" variant="h6" align="center">
                  Please, click here if you would like to access to your account
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth color="primary" variant="contained" href="login">
                  Login
                </Button>
              </CardActions>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <CardContent>
                <Typography component="p" variant="h6" align="center">
                  Please, click here if you would like to create a new account
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth color="primary" variant="contained" href="/registration">
                  Sign up
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Container>
       
      </div>
    )
}
export default Home;


