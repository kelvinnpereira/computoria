import React, { useEffect } from "react";
import { useTable, useSortBy, usePagination, useRowSelect, useFilters } from "react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { PageWithText } from "../pagination";

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length
  return (
    <div className="form-element" key="container-0">
      <input
        type="text"
        className={`form-input`}
        placeholder={`Search ${count} records...`}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        value={filterValue || ''}
      />
    </div>
  )
}

const defaultFilter = (rows, id, filterValue) => {
  return rows.filter((row) => row.values[id].toLowerCase().includes(filterValue));
}

const Datatable = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      filter: defaultFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  useEffect(() => console.log(selectedRowIds), [selectedRowIds]);

  return (
    <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex flex-row items-center justify-start">
                    <span>{column.render("Header")}</span>
                    <span className="ml-auto">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown className="stroke-current text-2xs" />
                        ) : (
                          <FiChevronUp className="stroke-current text-2xs" />
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
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>{column?.Filter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`datatable-${i}`}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-row items-center justify-between my-4">
        <div
          className="flex flex-wrap items-center justify-start space-x-2 pagination">
          {pageIndex !== 0 && (
            <PageWithText onClick={() => gotoPage(0)}>First</PageWithText>
          )}
          {canPreviousPage && (
            <PageWithText onClick={() => previousPage()}>Previous</PageWithText>
          )}
          {canNextPage && (
            <PageWithText onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </PageWithText>
          )}
          {pageIndex !== pageCount - 1 && (
            <PageWithText
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              Last
            </PageWithText>
          )}
        </div>

        <span>
          Page{" "}
          <b>
            {pageIndex + 1} of {pageOptions.length} ({data?.length})
          </b>{" "}
        </span>

        <select
          className="form-select text-sm bg-white dark:bg-gray-800 dark:border-gray-800 outline-none shadow-none focus:shadow-none border-gray-300 border-1 rounded-md"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Datatable;
