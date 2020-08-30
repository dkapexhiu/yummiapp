import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { motion } from 'framer-motion';
import { linkVariants } from '../utils/Variants'
import SelectPizza from '../Components/SelectPizza';
import { addProduct } from '../store/Cart/cartActions'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import axios from "axios";
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';

const Home = (props) => {

    const [pizza, setPizza] = useState({ src: "", id: 1, base: "", toppings: [], name: "", price: 0, quantity: 1 });

    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(true);

    const [pizzaData, setPizzaData] = useState(null);

    const [searchText, setSearchText] = useState("");
    const excludeColumns = [""];
  

    const fetchData = async () => {
      const response = await axios.get(
        "https://yummiapi.herokuapp.com/api/products"
      );
      //console.log(response.data.data);
      setPizzaData(response.data.data);
    };

    //fetchData();
    
    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        if (searchText === "") {
          fetchData();
        }
      }, [searchText]);

      const onKeyDown = e => {
        if (e.keyCode === 8) {
          setSearchText("");
        }
        fetchData();
      };  

    // handle change event of search input
    const handleChange = (value) => {
        setSearchText(value);
        filterData(value);
    };

    // filter records by search text
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setPizzaData(pizzaData);
        else {
        const filteredData = pizzaData.filter((item) => {
            return Object.keys(item).some((key) =>
            excludeColumns.includes(key)
                ? false
                : item[key].toString().toLowerCase().includes(lowercasedValue)
            );
        });
        setPizzaData(filteredData);
        }
    };


    const handleClickOpen = (name, price, id, src) => {
        setOpen(true);
        setPizza({ ...pizza, name, price, id, src, quantity: 1 });
    };

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToCart = () => {
        props.addProduct(pizza)
        setOpen(false)
    };

    const handleCheckout = () => {
        props.addProduct(pizza)
        setOpen(false)
        props.history.push('/checkout')
    }

    const addBase = (base) => {
        setPizza({ ...pizza, base })
    }

    const setQuantity = (event) => {
        let amount = parseInt(event.target.value)
        if (amount > 0) {
            setPizza({ ...pizza, quantity: amount })
        } else {
            setPizza({ ...pizza, quantity: 1 })
        }
    }

    const addTopping = (topping) => {
        let newToppings;
        if (!pizza.toppings.includes(topping)) {
            newToppings = [...pizza.toppings, topping];
        } else {
            newToppings = pizza.toppings.filter(item => item !== topping);
        }
        setPizza({ ...pizza, toppings: newToppings });
    }

    

    return (
        loading ?
            <div style={{ textAlign: 'center' }}>
                <img src="./loadingImg.gif" alt=""/>
            </div>
            :
                <Container maxWidth="lg">
                    <Carousel />
                    <SelectPizza
                        handleAddToCart={handleAddToCart}
                        addBase={addBase}
                        pizza={pizza}
                        addTopping={addTopping}
                        setQuantity={setQuantity}
                        handleClose={handleClose}
                        open={open}
                        handleCheckout={handleCheckout}
                    />
                    <div>
                    <input
                        id="inputField"
                        type="text"
                        placeholder="Type to search..."
                        value={searchText}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                        <Grid container spacing={3}>                          
                            {pizzaData &&
                                pizzaData.map((pizza, i) => (
                                    <Grid key={i} item xs={12} sm={i < 2 ? 4 : 4}>
                                        <div onClick={(name) => handleClickOpen(pizza.name, pizza.price, pizza.id, pizza.src)}>
                                            <div className="pizzaContainer">
                                                    <img className="pizzaImg" alt="" src={'./pizzapics/' + pizza.src} />
                                                <div className="pizzaInfo">
                                                    <motion.h2 variants={linkVariants} whileHover="hover">{pizza.name}</motion.h2>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                    <Footer />
                </Container>
    )
}

const mapStateToProps = state => ({
    currency: state.total.currency
});

export default connect(mapStateToProps, { addProduct })(withRouter(Home));
