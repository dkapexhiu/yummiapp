import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import Price from '../Components/Price'
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";

const Orders = (props) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                //console.log(user.email)
                db.collection("orders").where("email", "==", user.email).get()
                    .then(function (querySnapshot) {
                        setLoading(false)
                        //console.log(querySnapshot)
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            //console.log(doc.id, " => ", doc.data());
                            setData(prevData => prevData.concat(doc.data()))
                        });
                    });
            } else {
                props.history.push('/login')
            }
        })
    }, [props.history])

    return (
        loading ?
            <div style={{ textAlign: 'center' }}>
                <img src="./loadingImg.gif" alt=""/>
            </div>
            :
            data.length ?
                <Container maxWidth="sm">

                    <div>
                        {
                            data.map((d, i) => {
                                return (
                                    <div key={i} className="singleOrder">
                                        <h2>{d.name} ({d.address})</h2>
                                        <ul className="orderul">
                                            {d.cartProducts.map((cp, i) => (
                                                <div key={i}>
                                                    <li><h4>{cp.name}</h4></li>
                                                    <li>Price: <Price>{cp.price}</Price></li>
                                                    <li>Base: <Price>{cp.base}</Price></li>
                                                    <li>Toppings: {cp.toppings.join(', ')}</li>
                                                    <li>Quantity: {cp.quantity}</li>
                                                    <li>Delivery: <Price>2</Price></li>
                                                </div>
                                            ))}
                                        </ul>
                                        <h3>Total Amount: <Price>{d.totalPrice}</Price></h3>
                                    </div>
                                );
                            })
                        }
                    </div>
                </Container>
                :
                <div style={{ textAlign: 'center' }}>
                    <h2>No orders.</h2>
                </div>
    );
}

export default withRouter(Orders)