import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import { motion } from "framer-motion"
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const SelectPizza = ({ handleAddToCart, addBase, pizza, addTopping, setQuantity, handleClose, open, handleCheckout }) => {

    const toppings = ['mushrooms', 'peppers', 'onions', 'olives', 'extra cheese', 'tomatoes'];

    const bases = [
        { value: 10, label: 'Small' },
        { value: 20, label: 'Medium' },
        { value: 30, label: 'Large' }
    ];

    const basesnew = bases.map(element => element.value);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{pizza.name}</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <h4>Choose Base</h4>
                            <ul>
                                {basesnew.map(base => {
                                    let spanClass = pizza.base === base ? 'active' : '';
                                    return (
                                        <motion.li key={base} onClick={() => addBase(base)}
                                            whileHover={{ scale: 1.3, originX: 0, color: '#f8e112' }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <span className={spanClass}>Dimension {base} "</span>
                                        </motion.li>
                                    )
                                })}
                            </ul>
                            <br />
                            <TextField
                                label="Quantity"
                                type="number"
                                placeholder="1"
                                onChange={setQuantity}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h4>Choose Toppings</h4>
                            <ul>
                                {toppings.map(topping => {
                                    let spanClass = pizza.toppings.includes(topping) ? 'active' : '';
                                    return (
                                        <motion.li key={topping} onClick={() => addTopping(topping)}
                                            whileHover={{ scale: 1.3, originX: 0, color: '#f8e112' }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <span className={spanClass}>{topping}</span>
                                        </motion.li>
                                    )
                                })}
                            </ul>
                        </Grid>
                    </Grid>

                </DialogContent>
                <Divider />
                <DialogActions>

                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                    <Button onClick={handleCheckout}>Checkout</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SelectPizza