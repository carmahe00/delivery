import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material';

import { createCities, deleteCities, listCities, updateCities } from '../../actions/cityActions';


const CityPage = () => {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector(state => state.cityList)
  const [dataTable, setDataTable] = useState([
    { name: 'Juan', surname: 'Pablo', birthYear: null, birthCity: 63, fee: 4000 }, { name: 'Freddy', surname: 'Parada', birthYear: 1987, birthCity: 63, fee: 4000 }, { name: 'Carmenza', surname: 'Mateus', birthYear: 1987, birthCity: 63, fee: 4000 }, { name: 'Daniel', surname: 'Urrutia', birthYear: 1987, birthCity: 63, fee: 4000 }
  ]);
  useEffect(() => {
    dispatch(listCities())
  }, [dispatch])

  if (loading)
    return <CircularProgress style={{ width: '100px', height: '100px', margin: 'auto', display: 'block', marginTop: '50px' }} color="primary" />

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            dispatch(createCities(newRow))
            resolve()
          }),
          onRowUpdate: (newRow) => new Promise((resolve, reject) => {
            dispatch(updateCities(newRow))
            resolve()
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            dispatch(deleteCities(selectedRow))
            resolve()
          })
        }}
        actions={[
          {
            icon: () => <GetApp />,
            tooltip: "click me",
            onClick: (e, data) => console.log(data),
            //isFreeAction: true
          }
        ]}
        columns={[
          { title: 'Nombre', field: 'nombre', defaultSort: 'asc', type: 'string', emptyValue: () => <em>Vacio</em> },
        ]}
        data={cities}
        title="Ciudades"
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          filtering: true, addRowPosition: 'first', actionsColumnIndex: -1,
          selection: true, showSelectAllCheckbox: false, showTextRowsSelected: false
        }}
      />
    </div>
  )
}

export default CityPage
