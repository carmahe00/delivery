import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Hidden } from '@material-ui/core'
import { makeStyles, useTheme } from '@mui/styles'



const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.orange,
        width: "100%",
        zIndex: 1302,
        position: "relative"
    },
    adornment: {
        width: "25em",
        verticalAlign: "bottom",
        [theme.breakpoints.down("md")]: {
            width: "21em"
        },
        [theme.breakpoints.down("xs")]: {
            width: "15em"
        }
    },
    mainContainer: {
        position: "absolute"
    },
    link: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "0.75",
        fontWeight: "bold",
        textDecoration: "none"
    },
    gridItem: {
        margin: "3em"
    },
    icon:{
        height: "4em",
        width: "4em",
        [theme.breakpoints.down("xs")]:{
            height: "2.5em",
            width: "2.5em"
        },
    },
    socialContainer:{
        position: "absolute", 
        marginTop: "-5em",
        right: "1.4em",
        [theme.breakpoints.down("xs")]:{
            right: "0.6em",
        }
    }
}))

export default function Footer() {
    const classes = useStyles()
    return (
        <footer className={classes.footer} >
            <Hidden mdDown >
                <Grid container justifyContent="center" className={classes.mainContainer} >
                    <Grid item className={classes.gridItem} >
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/" className={classes.link} >
                                Home
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/services" className={classes.link} >
                                Services
                        </Grid>
                            <Grid item component={Link} to="/customsoftware" className={classes.link} >
                                Custom Software Development
                        </Grid>
                            <Grid item component={Link} to="/mobileapps" className={classes.link} >
                                iOS/Adnroid Development
                        </Grid>
                            <Grid item component={Link} to="/websites" className={classes.link} >
                                Web Site Development
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/revolution" className={classes.link} >
                                The revolution
                        </Grid>
                            <Grid item component={Link} to="/revolution" className={classes.link} >
                                Vision
                        </Grid>
                            <Grid item component={Link} to="/revolution" className={classes.link} >
                                Technology
                        </Grid>
                            <Grid item component={Link} to="/revolution" className={classes.link} >
                                Process
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Grid container direction="column" spacing={2} >
                            <Grid item component={Link} to="/about" className={classes.link} >
                                About Us
                        </Grid>
                            <Grid item component={Link} to="/about" className={classes.link} >
                                History
                        </Grid>
                            <Grid item component={Link} to="/about" className={classes.link} >
                                Team
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2} >
                            <Grid component={Link} to="/contact" item className={classes.link} >
                                Contact Us
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            
            <Grid container justifyContent="flex-end" spacing={2} className={classes.socialContainer} >
                <Grid item  component={"a"} href="http://www.facebook.com" rel="noopener noreferrer" target="_blank" >
                    
                </Grid>
                <Grid item component={"a"} href="http://www.twitter.com" rel="noopener noreferrer" target="_blank" >
                    
                </Grid>
                <Grid item component={"a"} href="http://www.instagram.com" rel="noopener noreferrer" target="_blank" >
                    
                </Grid>
            </Grid>
        </footer>)
}
