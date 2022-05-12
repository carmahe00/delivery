import React, { useEffect } from 'react'
import MaterialTable from '@material-table/core';
import { GetApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material';
import { createCities, listCities, updateCities } from '../../actions/cityActions';


const CityPage = () => {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector(state => state.cityList)
  
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
          { title: 'Nombre', field: 'nombre', defaultSort: 'asc', type: 'string' },
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
