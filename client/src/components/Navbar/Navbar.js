import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';



import nature from '../../images/nature.svg';

import logo1 from '../../images/logo1.svg';

import travel from '../../images/travel.svg';
import hobbyists from '../../images/hobbyists.png';
import quiz from '../../images/quiz.png';
import biking from '../../images/biking.svg';
import cooking from '../../images/cooking.svg';
import garden from '../../images/garden.svg';
import view from '../../images/view.svg';
import cam from '../../images/cam.svg';
import creative from '../../images/creative.svg';
import logo3 from '../../images/logo3.svg';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };



  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">



      <Link to="/" className={classes.brandContainer}>
        <img className={classes.hobbyists} component={Link} to="/" src={hobbyists} alt="icon" height="60px" />
      </Link>

      <Link to="/QuizHome" className={classes.brandContainer}>
        <img className={classes.quiz} component={Link} to="/QuizHome" src={quiz} alt="icon" height="60px" />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button className={classes.signin} component={Link} to="/auth" variant="contained" >Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
