import React, { useState, useEffect, useMemo, useRef } from "react";
import BezService from "../services/BezService";
import { useTable } from "react-table";

const BezList = (props) => {
  const [bezs, setBezs] = useState([]);
  const bezRef = useRef();

  bezRef.current = bezs;

  useEffect(() => {
    retrieveBezs();
  }, []);

  const retrieveBezs = () => {
    BezService.getAll()
      .then((response) => {
        setBezs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openBez = (rowIndex) => {
    const id = bezRef.current[rowIndex].gml_id;

    props.history.push("/bez/" + id);
  };

  const deleteBez = (rowIndex) => {
    const id = bezRef.current[rowIndex].gml_id;

    BezService.remove(id)
      .then((response) => {
        props.history.push("/bez");

        let newBez = [...bezRef.current];
        newBez.splice(rowIndex, 1);

        setBezs(newBez);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "GML_ID",
        accessor: "gml_id",
      },
      {
        Header: "Gemeinde_Name",
        accessor: "gemeinde_name",
      },
      {
        Header: "GemeindeschlÜssel",
        accessor: "gemeindeschlÜssel",
      },
      {
        Header: "Land_Name",
        accessor: "land_name",
      },
      {
        Header: "Land_Schluessel",
        accessor: "land_schluessel",
      },
      {
        Header: "Schluessel_Gesamt",
        accessor: "schluessel_gesamt",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openBez(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteBez(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: bezs,
  });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BezList;
