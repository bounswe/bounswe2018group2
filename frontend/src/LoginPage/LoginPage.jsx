import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import "./style.css";
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
function LoginPage(props) {
    const { classes } = props;

    return (
        <div className="loginPage">
            <CssBaseline/>
            <main className={classes.layout}>
                <LockIcon/>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"/>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign in
                    </Button>
                </form>
            </main>
        </div>
    );
}

export default withStyles(styles)(LoginPage);
