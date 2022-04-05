import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersCharge } from "../../actions/userActions";
import { Autocomplete, CircularProgress } from "@mui/material";
import { TextField, Box } from "@material-ui/core";

import {
  createRecharge,
  deleteRecharge,
  listCharges,
  updateRecharge,
} from "../../actions/rechargeActions";
import MaterialTable from "material-table";

function RechargePage() {
  const dispatch = useDispatch();
  const { recharges, loading } = useSelector((state) => state.rechargeCrud);
  const { users, loading: loadingUser } = useSelector(
    (state) => state.userCrud
  );
  useEffect(() => {
    dispatch(usersCharge());
    dispatch(listCharges());
  }, [dispatch]);
  

  if (loading || loadingUser)
    return (
      <CircularProgress
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
          marginTop: "50px",
        }}
        color="primary"
      />
    );
  console.log(users);
  return (
    <div style={{ maxWidth: "100%", height: "90%", overflow: "auto" }}>
      <MaterialTable
        data={recharges}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              dispatch(createRecharge(newRow));
              resolve();
            }),
          onRowUpdate: (newRow) =>
            new Promise((resolve, reject) => {
              dispatch(updateRecharge(newRow));
              resolve();
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              dispatch(deleteRecharge(selectedRow));
              resolve();
            }),
        }}
        title="Recargas"
        columns={[
          {
            title: "Usuario",
            field: "id_usuario",
            editComponent: (props) => (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event, {id_usuario})=>props.onChange(id_usuario)}
                options={users}
                getOptionLabel={(option) => option.nombre}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.nombre} ({option.celular})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Eliga un usuario"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            ),
            render: props =>(
              users.filter(user => user.id_usuario === props.id_usuario).map(user => user.nombre) 
            ),
            validate: (rowData) => rowData.name !== "",
          },
          {
            title: "fecha",
            field: "fecha",
            defaultSort: "asc",
            type: "date",
            editable: false,
            dateSetting: { format: "yyyy/MM/dd" },
            validate: (rowData) => rowData.name !== "",
          },
          {
            title: "TIPO",
            field: "tipo",
            lookup: {
              NORMAL: "NORMAL",
              CORTESIA: "CORTESIA",
            },
            validate: (rowData) => rowData.name !== "",
          },
          {
            title: "valor",
            field: "valor",
            defaultSort: "asc",
            type: "numeric",
            validate: (rowData) => rowData.name !== "",
          },
        ]}
        options={{
          filtering: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,

          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
        }}
      />
    </div>
  );
}

export default RechargePage;
