import React, { useState, useEffect } from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './authStyle'
import { auth } from '../../firebase'
import { Alert } from '@material-ui/lab';

import { setMessage } from '../../store/Auth/userActions'
import { motion } from 'framer-motion';
import { containerVariants } from '../../utils/Variants'
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


const Login = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        if (props.currentUser !== null) {
            props.history.push('/')
        }
    }, [props.currentUser])

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (isFormValid(state)) {
            setErrors([])
            setLoading(true)
            auth.signInWithEmailAndPassword(state.email, state.password)
                .then(signedInUser => {
                    props.setMessage("You have successfully signed in.")
                    //props.history.push('/')
                })
                .catch(err => {
                    console.log(err)
                    setErrors([].concat(err))
                    setLoading(false)
                })
        }

    }

    const isFormValid = ({ email, password }) => email && password


    const displayErrors = errors => errors.map((error, i) =>
        <span key={i}>{error.message}<br /></span>)


    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5"> Sign in</Typography>
                    <form className={classes.form} autoComplete="off" onSubmit={onSubmitHandler}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        {errors.length > 0 ? (
                            <Alert severity="error">{displayErrors(errors)}</Alert>
                        ) : null}
                        <Grid container>
                            <Grid item>
                                <Link to="/register">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </motion.div>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default withRouter(
    connect(mapStateToProps, { setMessage })(Login)
)