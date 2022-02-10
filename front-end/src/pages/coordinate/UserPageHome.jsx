import React, { useEffect, useMemo } from 'react'
import MaterialTable from 'material-table';
import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { listCities } from '../../actions/cityActions';
import { addUser, deleteUser, updateUser, users as usersFetch } from '../../actions/userActions';

const UserPageHome = () => {
    const dispatch = useDispatch();
    const { cities, loading: loadingCity } = useSelector(state => state.cityList)
    const { users, loading } = useSelector(state => state.userCrud)
    

    console.log(users)
    useEffect(() => {
        dispatch(listCities())
        dispatch(usersFetch("DOMICILIARIOS"))

    }, [dispatch])

    let lookupLog =  useMemo(() => ( cities && cities.reduce((obj, item) => (obj[item.id_ciudad] = item.nombre, obj), {})), [cities])

    if (loading && loadingCity)
        return <CircularProgress style={{ width: '100px', height: '100px', margin: 'auto', display: 'block', marginTop: '50px' }} color="primary" />

    




    return (
        <div style={{ maxWidth: '100%' }}>
            {lookupLog && <MaterialTable
                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        const type = "DOMICILIARIOS"
                        dispatch(addUser({ ...newRow, type }))
                        resolve()
                    }),
                    onRowUpdate: (newRow) => new Promise((resolve, reject) => {
                        
                        dispatch(updateUser(newRow))
                        resolve()
                    }),
                    onRowDelete: (newRow) => new Promise((resolve, reject) => {
                        dispatch(deleteUser(newRow))
                        resolve()
                    })
                }}
                columns={[
                    { title: "Ciudad", field: "id_ciudad", lookup: lookupLog },
                    { title: "Nombre", field: "nombre", emptyValue: () => <em>Vacio</em> },
                    { title: "Celular", field: "celular", emptyValue: () => <em>Vacio</em> },
                    { title: "Email", field: "email", emptyValue: () => <em>Vacio</em> },
                    { title: "Direccion", field: "direccion", emptyValue: () => <em>Vacio</em> },
                    { title: "Clave", field: "clave" },
                    { title: "Longitud", field: "longitud", type: "numeric" },
                    { title: "Latitud", field: "latitud", type: "numeric" },
                    { title: "tipo_vehiculo", field: "tipo_vehiculo", lookup: { "MOTO": "MOTO", "PARTICULAR": "PARTICULAR", "CAMION": "CAMION" } },
                    { title: "placa", field: "placa" },
                    { title: "fecha_tecnomecanica", field: "fecha_tecnomecanica", type: "date", dateSetting : { format: 'yyyy/MM/dd' } },
                    { title: "fecha_obligatorio", field: "fecha_obligatorio", type: "date", dateSetting : { format: 'yyyy/MM/dd' } },
                ]}
                data={users}
                title="DOMICILIARIOS"
                options={{
                    actionsColumnIndex: -1, addRowPosition: 'first'
                }}
            />}
        </div>
    )
}

export default UserPageHome
