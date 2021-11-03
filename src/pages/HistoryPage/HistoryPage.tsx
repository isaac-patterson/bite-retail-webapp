import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import { createStyles, makeStyles, ThemeProvider } from '@mui/styles';
import { Theme } from '@mui/material';
import { useGetSession } from '../UtilityHooks/AuthHooks';
import Modal from '@mui/material/Modal';
import { BiteCircularProgress } from "../../components/BiteCircularProgress"
import { theme } from "../../components/Theme"


const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            backgroundColor: '#FFFFFF',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',

        },
        DataGrid: {
            backgroundColor: '#E0E0E0',
        },
        Modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
));

const HistoryPage: React.FC = () => {
    useEffect(() => {
        getOrdersStatusFulfilled()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const classes = useStyles()
    const getSession = useGetSession()
    const [confirmedOrders, setconfirmedOrders] = useState<any[]>([])

    const getOrdersStatusFulfilled = async () => {
        setIsLoading(true)

        try {
            const { cognitoId, jwtToken } = await getSession(true)
            const url = `https://biteapp.work/retail/api/order/getpickedup/${cognitoId}`

            await axios.get(url, { headers: { AUTHORIZATION: "Bearer " + jwtToken } })
                .then(res => {
                    setconfirmedOrders(res.data.data)
                })
        } catch (err) {
            console.error(err.message);
        }
        setIsLoading(false)
    };

    const rows: GridRowsProp = confirmedOrders.map((order) => {
        const orderTime = new Date(order.createdDate)
        const displayOrderTime = `${orderTime.getHours()}:${orderTime.getUTCMinutes()} ${orderTime.getDate()}/${orderTime.getMonth()}/${orderTime.getFullYear()}`

        const orderContent =
            order.orderItem.map((orderItem) =>
                `${orderItem.name} (${orderItem.orderItemOption.map((orderItemOption) =>
                    `${orderItemOption.name}: ${orderItemOption.value}`
                )})\n`)

        return (
            {
                id: order.orderId,
                orderNumber: order.orderId,
                orderedBy: order.pickupName,
                total: order.total,
                date: displayOrderTime,
                order: orderContent,
                userId: order.cognitoUserId
            }
        )
    })

    const columns: GridColDef[] = [
        { field: 'orderNumber', headerName: 'Order #', width: 150 },
        { field: 'orderedBy', headerName: 'Ordered By', width: 150 },
        { field: 'total', headerName: 'Total $', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'order', headerName: 'Order', width: 400 },
        { field: 'userId', headerName: 'UserId', width: 400 },
    ];

    return (

        <div>
            <Modal
                open={isLoading}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.Modal}
            >
                <BiteCircularProgress size={150} />
            </Modal>

            <div className={classes.root}>
                <h2>
                    Fulfilled Order History
                </h2>

                <DataGrid className={classes.DataGrid} autoHeight={true} rows={rows} columns={columns} />
            </div>
        </div>

    );
}

export default HistoryPage;