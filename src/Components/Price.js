import React from 'react';
import { connect } from 'react-redux'

const Price = (props) => {
    //console.log(props);
    return (
        <>
            {
                props.currency === "USD" ?
                    "$" + parseInt(props.children).toFixed(2)
                    :
                    "€" + (parseInt(props.children) / 1.12).toFixed(2)
            }
        </>
    )
}

const mapStateToProps = state => ({
    currency: state.total.currency
});

export default connect(mapStateToProps, {})(Price);