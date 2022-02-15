import React, { useContext } from 'react'
import { FormControl, InputLabel, makeStyles, MenuItem, Modal, Paper, Select, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik';
import * as yup from 'yup';
import { closeModalSolicitud } from '../actions/modalActions';
import { SocketContext } from '../context/SocketProvider';

const validationSchema = yup.object({
    tipo_vehiculo: yup.string().required(),
    valor_pedido: yup.number().required(),
    asegurar: yup.boolean().required(),
    valor_seguro: yup.number().required(),
    evidencia: yup.boolean().required(),
    forma_pago: yup.string().required(),
    celular: yup.string().required(),
    nombre: yup.string().required(),
    observacion: yup.string().required()
})

const useStyles = makeStyles(theme => ({
    paperStyle: {
        padding: 20, margin: "20px auto",
        maxWidth: 800
    },
    btnStyle: {
        margin: '8px 0'
    },
    input: {
        display: 'none',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    rootForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))
const ModalSolicitud = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext)
    const { solicitudModalOpen, solicitudModal } = useSelector(state => state.modalSolicitud)
    const handleClose = () => dispatch(closeModalSolicitud());
    return (
        <Modal
            closeAfterTransition
            open={solicitudModalOpen}
            BackdropProps={{
                timeout: 500
            }}
            className={classes.modal}
            onClose={handleClose}
        >
            <Paper elevation={5} className={classes.paperStyle} >
                <Formik
                    validationSchema={validationSchema}
                    className={classes.rootForm}
                    initialValues={{
                        tipo_vehiculo: '',
                        valor_pedido: 0,
                        asegurar: false,
                        valor_seguro: 0,
                        evidencia: false,
                        forma_pago: '',
                        celular: '',
                        nombre: '',
                        observacion: null
                    }}
                    onSubmit={async (props) => {
                        console.log(socket)
                        socket.emit('emitir-mensaje',props)
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit} >
                            <FormControl className={classes.formControl}  >
                                <InputLabel htmlFor="tipo_vehiculo">Tipo Vehiculo</InputLabel>
                                <Select
                                    name="tipo_vehiculo"
                                    value={props.values.tipo_vehiculo}
                                    onChange={props.handleChange}
                                    defaultValue="PARTICULAR"

                                >
                                    <MenuItem value="MOTO"  >MOTO</MenuItem>
                                    <MenuItem value="PARTICULAR"  >PARTICULAR</MenuItem>
                                    <MenuItem value="CAMION"  >CAMION</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                type="number"
                                name="valor_pedido"
                                label="Ingersar el Valor Transportado"
                                value={props.values.valor_pedido}
                                onChange={props.handleChange}
                                error={props.touched.valor_pedido && Boolean(props.errors.valor_pedido)}
                            />
                            <TextField
                                type="number"
                                name="valor_seguro"
                                label="Ingersar el Valor Seguro"
                                value={props.values.valor_seguro}
                                onChange={props.handleChange}
                                error={props.touched.valor_seguro && Boolean(props.errors.valor_seguro)}
                            />


                            <FormControl className={classes.formControl}  >
                                <InputLabel htmlFor="forma_pago">Forma de Pago</InputLabel>
                                <Select
                                    name="forma_pago"
                                    value={props.values.forma_pago}
                                    onChange={props.handleChange}
                                    defaultValue="PAGO_TOTA"

                                >
                                    <MenuItem value="PAGO_TOTA"  >PAGO_TOTA</MenuItem>
                                    <MenuItem value="PAGA_ENVIA"  >PAGA_ENVIA</MenuItem>
                                    <MenuItem value="PAGA_RECIBE"  >PAGA_RECIBE</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                type="text"
                                name="nombre"
                                label="nombre"
                                value={props.values.nombre}
                                onChange={props.handleChange}
                                error={props.touched.nombre && Boolean(props.errors.nombre)}
                            />
                            <TextField
                                type="text"
                                name="celular"
                                label="celular"
                                value={props.values.celular}
                                onChange={props.handleChange}
                                error={props.touched.celular && Boolean(props.errors.celular)}
                            />

                            <FormControlLabel
                                size="small"
                                control={<Checkbox />}
                                name="asegurar"
                                label="Asegurar"
                                value={props.values.asegurar}
                                onChange={props.handleChange}
                                error={props.touched.asegurar && Boolean(props.errors.asegurar)}
                            />

                            <FormControlLabel
                                size="small"
                                control={<Checkbox />}
                                name="evidencia"
                                label="evidencia"
                                value={props.values.evidencia}
                                onChange={props.handleChange}
                                error={props.touched.evidencia && Boolean(props.errors.evidencia)}
                            />


                            <TextField fullWidth
                                label='Observacion'
                                placeholder='Ingrese una observacion'
                                name="observacion"
                                value={props.values.observacion}
                                onChange={props.handleChange}
                                error={props.touched.observacion && Boolean(props.errors.observacion)}
                                helperText={props.touched.observacion && props.errors.observacion}
                            />
                            <Button type='submit' color='primary' variant="contained" className={classes.btnStyle} >Enviar</Button>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Modal>
    )
}

export default ModalSolicitud
