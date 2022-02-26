import React from "react";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { PageWithText } from "../pagination";

const Datatable = ({ columns, data, title }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    pageOptions,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 }
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        ...columns
      ]);
    }
  );

  // Render the UI for your table
  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="text-sm font-light text-gray-500">{title}</div>
          <div className="text-sm font-bold">{data.length} tasks</div>
        </div>

        <div className="text-gray-500">
          {pageIndex * pageSize} - {(pageIndex + 1) * pageSize} of{" "}
          {pageOptions.length * pageSize}
        </div>

      </div>

      <table {...getTableProps()} className="table">
        <thead className="hidden">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div className="flex flex-row items-center justify-start">
                  <span>{column.render("Header")}</span>
                  {/* Add a sort direction indicator */}
                  <span className="ml-auto">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <icon className="icon-arrow-down text-2xs"/>
                        ) : (
                          <icon className="icon-arrow-up text-2xs"/>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td
                  className="align-top" {...cell.getCellProps()}>{cell.render(
                  "Cell")}</td>;
              })}
            </tr>
          );
        })}
        </tbody>
      </table>

      <div
        className="flex flex-row items-center justify-between space-x-2 my-2">
        <div
          className="flex flex-wrap items-center justify-start space-x-2 pagination">
          {canPreviousPage && (
            <PageWithText
              onClick={() => previousPage()}
              color="bg-gray-500 hover:bg-gray-600 text-white">
              Previous
            </PageWithText>
          )}
          {canNextPage && (
            <PageWithText
              onClick={() => nextPage()}
              disabled={!canNextPage}
              color="bg-gray-500 hover:bg-gray-600 text-white">
              Next
            </PageWithText>
          )}
        </div>

        <select
          className="form-select text-sm"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Datatable;
