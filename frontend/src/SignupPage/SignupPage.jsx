import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';




import "./style.css";
import RadioButtonsGroup from "./RadioButtonsGroup";
const styles = theme => ({
    layout: {
        width: "auto",
        borderRadius: "15px",
        border: "1px solid #D0D0D0",
        padding: "50px 20px",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    form: {
        width: "100%",
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});
function SignupPage(props) {
    const { classes } = props;

    return (
        <div className="signupPage">
            <CssBaseline/>
            <main className={classes.layout}>
                <LockIcon/>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                
                
                <form className={classes.container} noValidate autoComplete="off">
                <Grid container spacing={24}>
                    <Grid item xs={12} md={12}>
                        <RadioButtonsGroup></RadioButtonsGroup>
                   </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                        required
                        id="name"
                        label="Name"
                        className={classes.textField}
                        />
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <TextField
                        required
                        id="surname"
                        label="Surname"
                        className={classes.textField}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            required
                            fullWidth
                            id="mail"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="mail"
                        />
                    
                    </Grid>
                    
                    <Grid item xs={12} md={12}>
                        <TextField
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        />
                    </Grid>
                  

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign up
                    </Button>

                </Grid>
                </form>
                
               
               
 
            </main>

            
        </div>
    );
}

export default withStyles(styles)(SignupPage)