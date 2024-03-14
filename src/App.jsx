import React from 'react';
import { useTable, useExpanded } from '@tanstack/react-table';

// Assuming `data` is your transformed data array
const data = React.useMemo(
  () => [
    {
      id: 'txn.crd_entprty',
      type: 'Data Element',
      product: 'ICNT-ATLAS-SIMCORP-API',
      fab: 'fnd-crtfct-trns-API',
      description: null,
      children: [
        {
          id: 'Transformation',
          type: 'Transforn',
          product: 'ICAT-ATLAS-SIMCORP-API',
          fab: 'fnd-crtfct-trns-API',
          description: 'n/a',
          children: [
            {
              id: 'ed_cntrprty',
              type: 'Data Element',
              product: 'ICHT-AladdinAtlas Interface',
              fab: 'Atlas_Pos_Trans',
              description: null,
              children: [
                {
                  id: 'Transformation',
                  type: 'Transforn',
                  product: 'ICT-AladdinAtlas Interface',
                  fab: 'Atlas_Pos_Trans',
                  description:
                    'If transaction. tran_type is CALL, PUT, EXIN, or EXOUT',
                  children: [
                    {
                      id: 'TRAN_TYPE',
                      type: 'Data Element',
                      product: 'ICM-Blackrock-Aladdin',
                      fab: 'MainTransaction',
                      description: null,
                      children: null,
                    },
                    {
                      id: 'TRAN_TYPE',
                      type: 'Data Element',
                      product: 'ICM-Blackrock-Aladdin',
                      fab: 'MainTransaction',
                      description: null,
                      children: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  []
);

const columns = React.useMemo(
  () => [
    {
      // Use an expander column to show/hide the expandable content
      id: 'expander',
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? '👇' : '👉'}
        </span>
      ),
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      ),
    },
    { Header: 'ID', accessor: 'id' },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Classification', accessor: 'classification' },
    // Add more column definitions here
  ],
  []
);

const ExpandableTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data }, useExpanded);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <React.Fragment key={row.id}>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
              {row.isExpanded && (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {/* Render your expanded content here */}
                    <div style={{ paddingLeft: '20px' }}>
                      Expanded Details: {row.original.details}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

const App = () => <ExpandableTable columns={columns} data={data} />;

export default App;
