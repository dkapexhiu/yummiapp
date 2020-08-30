import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { linkVariants } from "../utils/Variants"
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withRouter, Link } from "react-router-dom";
import { auth } from '../firebase'
import { setMessage } from '../store/Auth/userActions'


const Account = (props) => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const signOutHandler = () => {
        auth.signOut().then(function () {
            props.setMessage("You are logged out.") 
        }).catch(function (error) {
            props.setMessage("Couldn't logout. Please try again")
        });
        setOpen(false)
    }

    const handleAccountToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }


    return (
        <>
            <motion.div className="menuicons" variants={linkVariants} whileHover="hover" >
                {
                    props.currentUser == null ? (
                        <Link to="/login">
                            <AccountBoxRoundedIcon style={{ fontSize: 27 }} />
                        </Link>
                    ) : (
                            <AccountBoxRoundedIcon
                                style={{ fontSize: 27 }}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleAccountToggle} />
                        )
                }


            </motion.div>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <Link to="/orders"><MenuItem onClick={handleClose}>My Orders</MenuItem></Link>
                                    <MenuItem onClick={signOutHandler}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default withRouter(
    connect(mapStateToProps, { setMessage })(Account)
)