import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Toolbar,
    Switch,
    Button
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transaction from 'react-dappify/model/Transaction';

import constants from 'react-dappify/constants';

// table header
const headCells = [
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status'
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'Amount'
    },
    {
        id: 'updated',
        numeric: false,
        disablePadding: false,
        label: 'Updated'
    },
    {
        id: 'explorer',
        numeric: false,
        disablePadding: false,
        label: 'View in explorer'
    },
    {
        id: 'symbol',
        numeric: false,
        disablePadding: false,
        label: 'Symbol'
    },
    {
        id: 'uid',
        numeric: false,
        disablePadding: false,
        label: 'Unique Identifier'
    },
    {
        id: 'transactionHash',
        numeric: false,
        disablePadding: false,
        label: 'Transaction Hash'
    }
];

// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : undefined}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ minWidth: 150 }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE - TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ==============================|| TABLE - ENHANCED ||============================== //

const TransactionList = () => {
    const appConfiguration = useSelector((state) => state.app);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rows, setRows] = useState([]);
    const [count, setCount] = useState(0);

    const loadTransactions = async() => {
        const txs = await Transaction.listByProject({
            projectId: appConfiguration.appId,
            page: page,
            limit: rowsPerPage
        });
        setRows(txs.results);
        setCount(txs.count);
    };

    useEffect(() => {
        loadTransactions({ page: page, limit: rowsPerPage });
    }, [page, rowsPerPage]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const getExplorerUrl = (row) => {
        const network = constants.NETWORKS[row.chainId];
        return `${network.blockExplorerUrls[0]}/tx/${row.transactionHash}`;
    };

    return (
        <MainCard
            content={false}
            title={`Transactions (${count})`}
        >

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {rows.map((row, index) => {
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="normal">
                                            {row.status}
                                        </TableCell>
                                        <TableCell align="left">${row.amount.toFixed(4)}</TableCell>
                                        <TableCell align="left">{moment(row.updatedAt).fromNow()}</TableCell>
                                        <TableCell align="left">
                                            <Button href={getExplorerUrl(row)} target="_blank">View</Button>
                                        </TableCell>
                                        <TableCell align="left">{row.symbol}</TableCell>
                                        <TableCell align="left">
                                            {row.uid}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.transactionHash}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}

export default TransactionList;