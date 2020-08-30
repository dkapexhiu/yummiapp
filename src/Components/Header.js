import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { linkVariants } from "../utils/Variants"
import { Link } from "react-router-dom";
import CartDrawer from './Cart/CartDrawer'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { changeCurrency } from '../store/total/totalActions'
import withWidth from '@material-ui/core/withWidth';
import MenuItem from '@material-ui/core/MenuItem';
import Account from './Account'

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    }
];


const Header = (props) => {

    const [currency, setCurrency] = React.useState(props.currency);
    const [drawer, setDrawer] = React.useState(false);


    useEffect(() => {
        setCurrency(props.currency)
    }, [props.currency])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(open);
    };

    const handleChange = (event) => {
        props.changeCurrency(event.target.value);
    };


    return (
        <header>
            <motion.div className="logo"
                drag
                dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                dragElastic={0.7}
            >
                <Link to="/">
                    <img src="./logo.png" alt=""/>
                </Link>
            </motion.div>
            <motion.div className="title"
                initial={{ y: -250 }}
                animate={{ y: -10 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
                <div className="logoless">
                    {props.width !== "xs" ? (
                        <h1 className="appNameH1"><Link to="/">Yummi Pizza</Link></h1>
                    ) : null}

                    <span className="float-right">
                        <form noValidate className="dropdownform" autoComplete="off">
                            <TextField
                                select
                                value={currency}
                                onChange={handleChange}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>

                        <Account />

                        <motion.div
                            onClick={toggleDrawer("right", true)}
                            className="menuicons shoppingCartIcon"
                            variants={linkVariants}
                            whileHover="hover" >
                            <ShoppingCartRoundedIcon style={{ fontSize: 27 }} className="margin-left" />
                            {props.cartTotal.productQuantity > 0 ? (
                                <span className="cartTotalNum">{props.cartTotal.productQuantity}</span>
                            ) : null}

                        </motion.div>
                    </span>

                </div>
            </motion.div>
            <CartDrawer toggleDrawer={toggleDrawer} drawer={drawer} />

        </header>
    )
}

const mapStateToProps = state => ({
    cartTotal: state.total.data,
    currency: state.total.currency
});

export default connect(
    mapStateToProps,
    { changeCurrency }
)(withWidth()(Header));
