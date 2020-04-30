import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStylesSignIn } from '../utils/styles';
import { apiRequest, validateLoginForm } from '../utils/helpers';
import useErrorHandler from '../hooks/useError';
import { authContext } from '../context/AuthContext';


const SignIn = () => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { error, showError } = useErrorHandler(null);
    const auth = React.useContext(authContext);

    const login = async () => {
        console.log('front Login');
        try {
            setLoading(true);
            const user = await apiRequest(
                '/login',
                'post',
                { email: userEmail, password: userPassword }
            );
            console.log('data from my apirequest, please ', user);
            const { id, email } = user;
            auth.setAuthStatus({ id, email });
            setLoading(false);
            console.log('Here my auth??', auth);
            // if (auth.email === email) {
            return <Redirect to={`/profile/ ${+ id}`} />
            // }
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('here my userEmail, userPassword', userEmail, userPassword);
        if (validateLoginForm(userEmail, userPassword, showError)) {
            login();
        };
    };

    const classes = useStylesSignIn();

    return (
        <div >
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Login to your account
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={submitForm}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    // autoComplete="email"
                                    id="email"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    autoFocus
                                    required
                                    fullWidth
                                    value={userEmail}
                                    onChange={e => setUserEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // autoComplete="current-password"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={userPassword}
                                    onChange={e => setUserPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me ???"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {loading ? 'Loading...' : 'Log In'}
                            </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        {/* <br />
                        {error ? console.log('Erroor', error) : console.log('Todo guay')} */}
                    </form>
                </div>
            </Container>

        </div>
    )
}
export default SignIn;
