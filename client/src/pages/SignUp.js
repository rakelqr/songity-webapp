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
import { apiRequest, validateLoginForm } from '../utils/helpers';
import useErrorHandler from '../hooks/useError';
import { useStylesSignUp } from '../utils/styles';


const SignUp = () => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { error, showError } = useErrorHandler(null);

    const registerUser = async () => {
        console.log('front register');
        try {
            setLoading(true);
            const newUser = await apiRequest(
                '/registration',
                'post',
                { email: userEmail, password: userPassword }
            );
            console.log('data from my apirequest, please ', newUser);
            setLoading(false);
            return <Redirect to='/login'/>
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    };

    const submitRegisterForm = (e) => {
        e.preventDefault();
        console.log('here my userEmail, userPassword', userEmail, userPassword);
        if (validateLoginForm(userEmail, userPassword, showError)) {
            registerUser();
        };
    };

    const classes = useStylesSignUp();

    return (
        <div >
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create a new account
                </Typography>
                    <form className={classes.form} noValidate onSubmit={submitRegisterForm}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
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
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="We need you check this in order to finish the lockdown. Thanks."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {loading ? 'Loading...' : 'Sign up'}
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    {/* )}
                </Formik> */}
            </div>
            </Container>

        </div>
    )
}
export default SignUp;