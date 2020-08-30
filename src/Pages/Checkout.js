import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { db } from '../firebase'
import Typography from '@material-ui/core/Typography';
import useStyles from './Auth/authStyle'
import { Alert } from '@material-ui/lab';
import { resetProducts } from '../store/Cart/cartActions'
import { resetData } from '../store/total/totalActions'
import { withRouter } from "react-router-dom";
import { motion } from 'framer-motion';
import { containerVariants } from '../utils/Variants'
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { setMessage } from "../store/Auth/userActions"


const Checkout = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    })

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const { currentUser } = props
        setState({
            ...state,
            email: currentUser !== null ? currentUser.email : ''
        })
    }, [])

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (isFormValid(state)) {
            if (props.cartProducts.length) {
                setErrors([])
                setLoading(true)
                db.collection("orders").doc()
                    .set({
                        name: state.name,
                        email: state.email,
                        address: state.address,
                        phone: state.phone,
                        cartProducts: props.cartProducts,
                        totalPrice: props.cartTotal.totalPrice
                    })
                    .then(() => {
                        console.log("createdOrder")
                        props.resetProducts()
                        props.resetData()
                        props.setMessage("We have received your order.")
                        props.currentUser == null ?
                            props.history.push('/') :
                            props.history.push('/orders')
                    })
                    .catch(err => {
                        console.log(err)
                        setErrors([].concat(err))
                        setLoading(false)
                    })
            } else {
                setErrors([].concat({ message: "Please select pizza and then checkout." }))
            }

        }

    }

    const isFormValid = ({ name, email, address }) => name && email && address


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
                    <Typography component="h1" variant="h5"> Checkout</Typography>
                    <form className={classes.form} autoComplete="off" onSubmit={onSubmitHandler}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Full name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={state.email}
                            type="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone number"
                            type="number"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="address"
                            label="Address"
                            type="text"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Place your order
                        </Button>
                        {errors.length > 0 ? (
                            <Alert severity="error">{displayErrors(errors)}</Alert>
                        ) : null}
                    </form>
                </div>
            </Container>
        </motion.div>
    );
}

const mapStateToProps = state => ({
    cartProducts: state.cart.products,
    cartTotal: state.total.data,
    currentUser: state.user.currentUser
});

export default connect(
    mapStateToProps, { resetProducts, resetData, setMessage }
)(withRouter(Checkout));