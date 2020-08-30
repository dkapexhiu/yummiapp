import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../../store/Cart/cartActions';
import { updateCart } from '../../store/total/totalActions';
import CartProduct from './CartProduct';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Price from '../Price';
import { Link } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import { setMessage } from "../../store/Auth/userActions"

const useStyles = theme => ({
    list: {
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
        [theme.breakpoints.up('md')]: {
            width: 350,
        },

        backgroundColor: '#145064',
        height: "100%"
    },
    cartItem: {
        backgroundColor: '#145064',
    },
    fullList: {
        width: 'auto',
    },
    cartText: {
        textAlign: 'center',
        margin: '2rem',
    }
});


class CartDrawer extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.newProduct !== this.props.newProduct) {
            this.addProduct(nextProps.newProduct);
        }

        if ((nextProps.productToRemove !== this.props.productToRemove)) {
            this.removeProduct(nextProps.productToRemove);
        }

        if ((nextProps.productToChange !== this.props.productToChange)) {
            this.changeProductQuantity(nextProps.productToChange);
        }
    }


    addProduct = product => {
        const { cartProducts, updateCart, setMessage } = this.props;
        let productAlreadyInCart = false;
        setMessage("Pizza added to cart.")

        cartProducts.forEach(cp => {
            if (_.isEqual(cp.toppings, product.toppings) && (cp.id === product.id) && (cp.base === product.base)) {
                cp.quantity += parseInt(product.quantity)
                productAlreadyInCart = true;
            }
        });

        if (!productAlreadyInCart) {
            cartProducts.push(product);
        }

        updateCart(cartProducts);
    };

    removeProduct = product => {
        const { cartProducts, updateCart } = this.props;
        //console.log(product)
        //console.log(cartProducts)
        const index = cartProducts.findIndex(cp =>
            (_.isEqual(cp.toppings, product.toppings) && (cp.id === product.id) && (cp.base === product.base))
        );
        if (index >= 0) {
            //console.log(cartProducts)
            cartProducts.splice(index, 1);
            //console.log(index)
            updateCart(cartProducts);
        } else {
            console.log("Could not find product to remove")
            //console.log(product)
        }
    };

    proceedToCheckout = () => {

    };

    changeProductQuantity = changedProduct => {
        const { cartProducts, updateCart } = this.props;
        const product = cartProducts.find(cp => (_.isEqual(cp.toppings, changedProduct.toppings) && (cp.id === changedProduct.id) && (cp.base === changedProduct.base)));
        if (product) {
            product.quantity = parseInt(changedProduct.quantity)
            if (product.quantity <= 0) {
                this.removeProduct(product);
            }
            updateCart(cartProducts);
        } else {
            console.log(changedProduct)
            console.log(cartProducts)
        }

    }

    render() {
        const { classes } = this.props;
        const { cartTotal, cartProducts, removeProduct, changeProductQuantity } = this.props;

        let products = cartProducts.map((p, i) => {
            return (
                <CartProduct
                    key={uuidv4()}
                    product={p}
                    removeProduct={removeProduct}
                    changeProductQuantity={changeProductQuantity}
                />
            );
        });


        const list = (anchor) => (
            <div
                className={classes.list}
                role="presentation"
                //onClick={this.props.toggleDrawer(anchor, false)}
                onKeyDown={this.props.toggleDrawer(anchor, false)}
            >
                <h1 className={classes.cartText}>CART</h1>
                {products}
                {!products.length && (
                    <p className={classes.cartText}>
                        No products in your cart.
                    </p>
                )}
                {products.length > 0 ? (
                    <div>
                        <h3 className="subtotalCart">
                            SUBTOTAL: <Price>{cartTotal.totalPrice}</Price>
                        </h3>
                        <span className="shippingCart">Includes <Price>2</Price> shipping cost</span>
                        <Link to='/checkout'>
                            <Button
                                onClick={this.props.toggleDrawer("right", false)}
                                className="cartCheckoutBtn"
                                color="primary">
                                CHECKOUT
                            </Button>
                        </Link>
                    </div>
                ) : null}

            </div>
        );

        return (
            <Drawer anchor="right" open={this.props.drawer} onClose={this.props.toggleDrawer("right", false)}
                classes={{
                    MuiPaperRoot: classes.root, // class name, e.g. `classes-nesting-root-x`
                }}>
                {list("right")}
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    cartProducts: state.cart.products,
    newProduct: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    productToChange: state.cart.productToChange,
    cartTotal: state.total.data
});

export default connect(
    mapStateToProps,
    { loadCart, updateCart, removeProduct, changeProductQuantity, setMessage }
)(withStyles(useStyles)(withWidth()(CartDrawer)));
