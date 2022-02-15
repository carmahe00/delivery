
import { makeStyles } from '@material-ui/core';
import { Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CardDomicilio from '../../components/CardDomicilio'
import { SocketContext } from '../../context/SocketProvider'

const useStyles = makeStyles(theme => ({
    container: {
        padding: "2em",
        marginBottom: "5em"
    }
}));

const Desktop = () => {
    const classes = useStyles()
    const { socket } = useContext(SocketContext)
    const { pedidos } = useSelector(state => state.pedidosConnect)
    useEffect(() => {
        console.log(socket)
    }, [socket])

    return (
        <div className={classes.container} >
            <Grid spacing={3} container >
            {
                pedidos.length > 0 && (
                    pedidos.map(pedido => (
                        <CardDomicilio
                            pedido={pedido}
                        />
                    ))
                )
            }
            </Grid>
        </div>
    )
}

export default Desktop
