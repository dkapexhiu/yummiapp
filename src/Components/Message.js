import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Message = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (props.message !== "") {
            setOpen(true);
        }
    }, [props.message])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">{props.message}</Alert>
            </Snackbar>
        </div>
    );
}

const mapStateToProps = state => ({
    message: state.user.message,
});

export default connect(
    mapStateToProps
)(Message);
