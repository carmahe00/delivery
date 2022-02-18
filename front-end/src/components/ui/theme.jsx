import { createTheme } from "@mui/material";

const delOrange = "#eba434";
const delCofee = "#c94e28";
const delYellow = "#8a8a81";
const delDark = "#911616";

export default createTheme({
    palette: {
        common: {
            orange: delOrange,
            coffe: delCofee,
            yellow: delYellow
        },
        primary: {
            main: delYellow
        },
        secondary: {
            main: '#ffffff'
        },
        
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
        },
        h2: {
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: "2.5rem",
            color: delOrange,
            lineHeight: 1.5
        },
        h4: {
            fontFamily: "Raleway",
            fontSize: "1.7rem",
            color: delOrange,
            fontWeight: 700
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",
            color: delOrange
        },
        h5:{
            fontFamily: "Raleway",
            fontSize: "1.7rem",
            color: delOrange,
            fontWeight: 700
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: delDark
        },
        subtitle2: {
            color: "white",
            fontSize: "1.25rem",
            fontWeight: 300
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "1rem",
            textTransform: "none",
            color: "white"
        },
        learnButton: {
            borderColor: delOrange,
            borderWidth: 2,
            color: delOrange,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold"
        }
    }
})