import React, { useContext } from 'react'
import { FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik';
import * as yup from 'yup';
import { closeModalSolicitud } from '../actions/modalActions';
import { SocketContext } from '../context/SocketProvider';

const validationSchema = yup.object({
    tipo_vehiculo: yup.string().required(),
    valor_pedido: yup.number().required(),
    valor_domicilio: yup.number().required(),
    asegurar: yup.boolean().required(),
    valor_seguro: yup.number().required(),
    evidencia: yup.boolean().required(),
    forma_pago: yup.string().required(),
    celular: yup.string().required(),
    nombre: yup.string().required(),
    descripcion: yup.string().required(),
    entregar: yup.string().required(),
    recoger: yup.string().required(),
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
}), {index: 1})
const ModalSolicitud = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext)
    const { solicitudModalOpen, solicitudModal } = useSelector(state => state.modalSolicitud) // TODO: AL momento de editar
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
                        entregar:  solicitudModal.entregar ?? '' ,
                        lat_entregar: solicitudModal.lat_entregar ?? '' ,
                        lon_entregar : solicitudModal.lon_entregar  ?? '' ,
                        lat_recoger: solicitudModal.lat_recoger ?? '' ,
                        lon_recoger: solicitudModal.lon_recoger ?? '' ,
                        recoger:  solicitudModal.recoger ?? '' ,
                        tipo_vehiculo:  solicitudModal.tipo_vehiculo ?? '' ,
                        valor_domicilio:  solicitudModal.valor_domicilio ?? 0 ,
                        valor_pedido:  solicitudModal.valor_pedido ?? 0 ,
                        asegurar:  solicitudModal.asegurar ?? false ,
                        valor_seguro:  solicitudModal.valor_seguro ?? 0 ,
                        evidencia:  solicitudModal.evidencia ?? false ,
                        forma_pago:  solicitudModal.forma_pago ?? '' ,
                        celular:  solicitudModal.celular ?? '' ,
                        nombre:  solicitudModal.nombre ?? '' ,
                        descripcion:  solicitudModal.descripcion ?? null ,
                        id_pedido: solicitudModal.id_pedido
                    }}
                    onSubmit={async (props) => {
                        console.log(socket)
                        socket.emit('emitir-mensaje',props)
                        dispatch(closeModalSolicitud())
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
                            <TextField
                                type="number"
                                name="valor_domicilio"
                                label="Valor Domicilio"
                                value={props.values.valor_domicilio}
                                onChange={props.handleChange}
                                error={props.touched.valor_domicilio && Boolean(props.errors.valor_domicilio)}
                            />

                            <FormControl className={classes.formControl}  >
                                <InputLabel htmlFor="forma_pago">Forma de Pago</InputLabel>
                                <Select
                                    name="forma_pago"
                                    value={props.values.forma_pago}
                                    onChange={props.handleChange}
                                    defaultValue="PAGO_TOTAL"

                                >
                                    <MenuItem value="PAGO_TOTAL"  >PAGO_TOTAL</MenuItem>
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
                                name="entregar"
                                label="entregar"
                                value={props.values.entregar}
                                onChange={props.handleChange}
                                error={props.touched.entregar && Boolean(props.errors.entregar)}
                            />
                            <TextField
                                type="text"
                                name="recoger"
                                label="recoger"
                                value={props.values.recoger}
                                onChange={props.handleChange}
                                error={props.touched.recoger && Boolean(props.errors.recoger)}
                            />
                            <TextField
                                type="text"
                                name="lat_entregar"
                                label="lat_entregar"
                                value={props.values.lat_entregar}
                                onChange={props.handleChange}
                                error={props.touched.lat_entregar && Boolean(props.errors.lat_entregar)}
                            />
                            <TextField
                                type="text"
                                name="lon_entregar"
                                label="lon_entregar"
                                value={props.values.lon_entregar}
                                onChange={props.handleChange}
                                error={props.touched.lon_entregar && Boolean(props.errors.lon_entregar)}
                            />
                            <TextField
                                type="text"
                                name="lat_recoger"
                                label="lat_recoger"
                                value={props.values.lat_recoger}
                                onChange={props.handleChange}
                                error={props.touched.lat_recoger && Boolean(props.errors.lat_recoger)}
                            />
                            <TextField
                                type="text"
                                name="lon_recoger"
                                label="lon_recoger"
                                value={props.values.lon_recoger}
                                onChange={props.handleChange}
                                error={props.touched.lon_recoger && Boolean(props.errors.lon_recoger)}
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


                            <TextField 
                                fullWidth
                                label='Observación'
                                placeholder='Ingrese una observación'
                                name="descripcion"
                                value={props.values.descripcion}
                                onChange={props.handleChange}
                                error={props.touched.descripcion && Boolean(props.errors.descripcion)}
                                helperText={props.touched.descripcion && props.errors.descripcion}
                            />
                            <Button type='submit' color='primary' variant="contained" className={classes.btnStyle} >Enviar</Button>
                            <Button onClick={handleClose} className={classes.btnStyle} >cancelar</Button>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Modal>
    )
}

export default ModalSolicitud
