import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { CircularProgress } from '@mui/material';

import { addUser, updateUser, users as usersFetch } from '../../actions/userActions';
import { listCities } from '../../actions/cityActions';

const UserPage = () => {
    const dispatch = useDispatch();
    const { cities, loading: loadingCity } = useSelector(state => state.cityList)
    const { users, loading } = useSelector(state => state.userCrud)
    useEffect(() => {
        dispatch(listCities())
        dispatch(usersFetch())

    }, [dispatch])

    let lookupLog = useMemo(() => (cities && cities.reduce((obj, item) => (obj[item.id_ciudad] = item.nombre, obj), {})), [cities])

    if (loading && loadingCity)
        return <CircularProgress style={{ width: '100px', height: '100px', margin: 'auto', display: 'block', marginTop: '50px' }} color="primary" />


    return (
        <div style={{ maxWidth: '100%', height: "90%", overflow: "auto" }}>
            {lookupLog && <MaterialTable
                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {

                        dispatch(addUser(newRow))
                        resolve()
                    }),
                    onRowUpdate: (newRow) => new Promise((resolve, reject) => {
                        dispatch(updateUser(newRow))
                        resolve()
                    })
                
                }}
                columns={[
                    { title: "Ciudad", field: "id_ciudad", lookup: lookupLog },
                    { title: "Nombre", field: "nombre", emptyValue: () => <em>Vacio</em> },
                    { title: "Celular", field: "celular", emptyValue: () => <em>Vacio</em> },
                    { title: "Email", field: "email", emptyValue: () => <em>Vacio</em> },
                    { title: "Direccion", field: "direccion", emptyValue: () => <em>Vacio</em> },
                    { title: "Clave", field: "clave" }
                ]}
                data={users}
                title="Usuarios"
                options={{
                    actionsColumnIndex: -1, addRowPosition: 'first'
                }}
            />}
        </div>
    )
}

export default UserPage
