import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Price from '../Price';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 80,
        height: 80,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        width: '100%',
        maxHeight: '100%',
        borderRadius: '50%'
    },
});

class CartProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
        };
    }

    handleOnIncrease = () => {
        const { changeProductQuantity } = this.props;
        const { product } = this.state;
        product.quantity = product.quantity + 1;
        changeProductQuantity(product);
    }

    handleOnDecrease = () => {
        const { changeProductQuantity } = this.props;
        const { product } = this.state;
        product.quantity = product.quantity - 1;
        changeProductQuantity(product);
    }

    render() {
        const { classes } = this.props;
        const { removeProduct } = this.props;
        const { product } = this.props;

        return (
            <>

                <Divider />
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={'./pizzapics/' + product.src} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">{product.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            Base: <Price>{product.base}</Price> 
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            Toppings: {product.toppings.join(", ")}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Quantity: {product.quantity}

                                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                                <Button onClick={this.handleOnDecrease}>-</Button>
                                                <Button onClick={this.handleOnIncrease}>+</Button>
                                            </ButtonGroup>
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            <Price>{product.price}</Price>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography onClick={() => removeProduct(product)} variant="body2" style={{ cursor: 'pointer' }}>X</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                <Divider />

            </>

        );
    }
}

export default withStyles(useStyles)(CartProduct);
