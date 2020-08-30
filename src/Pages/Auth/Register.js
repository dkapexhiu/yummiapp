import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './authStyle'
import { db, auth } from '../../firebase'
import { Alert } from '@material-ui/lab';
import md5 from 'md5'
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';
import { containerVariants } from '../../utils/Variants'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setMessage } from '../../store/Auth/userActions'

const Register = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.currentUser !== null) {
            props.history.push('/')
        }
    }, [props.currentUser, props.history])

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }


    const isFormValid = () => {
        let error
        if (!isPasswordValid(state)) {
            error = { message: "Password fields must be equal and must be more than 6 letters" }
            setErrors([].concat(error))
            setLoading(false)
            return false
        } else {
            return true
        }
    }


    const onSubmitHandler = (event) => {
        event.preventDefault()
        setErrors([])
        setLoading(true)
        if (isFormValid()) {

            auth.createUserWithEmailAndPassword(state.email, state.password)
                .then(createdUser => {
                    console.log(createdUser)
                    createdUser.user.updateProfile({
                        displayName: state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    }).then(() => {
                        saveUser(createdUser).then(() => {
                            console.log(createdUser)
                            props.setMessage("Welcome to Pizzashop.")
                            //props.history.push('/')
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        console.log(err)
                        setErrors([].concat(err))
                        setLoading(false)
                    })
                })
                .catch(err => {
                    console.log(err)
                    setErrors([].concat(err))
                    setLoading(false)
                })
        }

    }

    const saveUser = (createdUser) => {
        return db.collection("users").doc(createdUser.user.uid)
            .set({
                name: createdUser.user.displayName,
                email: createdUser.user.email
            })
    }

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
                    <Typography component="h1" variant="h5"> Register</Typography>
                    <form className={classes.form} autoComplete="off" onSubmit={onSubmitHandler}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Password Confirmation"
                            type="password"
                            onChange={handleChange}
                        />
                        {errors.length > 0 ? (
                            <Alert severity="error">{displayErrors(errors)}</Alert>
                        ) : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            className={classes.submit}
                        >
                            Register
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Login"}
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
    connect(mapStateToProps, { setMessage })(Register)
)
