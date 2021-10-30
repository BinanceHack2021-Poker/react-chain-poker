import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/magic';
import Button from '@material-ui/core/Button';
import {Grid, makeStyles, Paper, TextField, withStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
        marginTop: 100,
    },
    padding: {
        padding: theme.spacing.unit
    }
}));

function Fingerprint() {
    return null;
}

function Face() {
    return null;
}

const AuthenticateView = ({ setStatus }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(null);

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email) {
      setLoading(false);
      setError('Email is Invalid');
      return;
    }
    try {
      await loginUser(email, setStatus);
      setLoading(false);
      history.replace('/game');
    } catch (error) {
      setError('Unable to log in');
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <Grid container spacing={2} justify="center">
      <Grid xs={12} sm={4} md={4} item>
        <div className={classes.margin}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            label="Email"
                            onChange={handleChange}
                            placeholder="Email Address"
                            fullWidth
                            autoFocus
                            required
                        />
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        {/*<FormControlLabel control={*/}
                        {/*    <Checkbox*/}
                        {/*        color="primary"*/}
                        {/*    />*/}
                        {/*} label="Remember me" />*/}
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Can not login ?</Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        style={{ textTransform: "none" }}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                </Grid>
            </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthenticateView;
