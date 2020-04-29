import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignUp = () => {

    const initialValues = {
        name: '',
        password: '',
        email: '',
    };
    const classes = useStyles()

    return (
        <div >
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create a new account
                </Typography>
                {/* <Formik
                    initialValues={initialValues}
                    onSubmit={values => console.log('submitting', values)}
                >
                    {({ handleSubmit, handleChange, values }) => ( */}
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="fname"
                                        name="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="We need you check this in order to finish the breackdown. Thanks."
                                    />
                                </Grid>

                                {/* <input onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    type="text"
                                    placeholder="Email">
                                </input>
                                <input onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    type="text"
                                    placeholder="Password">
                                </input>
                                <input onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    type="text"
                                    placeholder="Name">
                                </input> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
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