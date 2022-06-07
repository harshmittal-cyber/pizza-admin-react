import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrder } from '../redux/actions/orderAction';
import moment from 'moment'

const Orders = () => {
    const { orders, loading } = useSelector((state) => state.orderReducer);
    const [status, setStatus] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleUpdate = (orderId) => {
        dispatch(updateOrder(orderId, status)).then((res) => {
            if (res.success) {
                setStatus('')
            }
        })

    }

    return (
        <section className="">
            <div className="card">
                <div className="card-header border-bottom d-flex align-items-center">
                    <h5 className="me-auto">All Orders</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-nowrap">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Time</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">Actions</th>
                                <th scope='çol'>Completed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index} className="text-heading">
                                    <td><p className="text-heading font-semibold text-uppercase">{item.orderId}</p></td>
                                    <td>{item.addressId.address.name}</td>
                                    <td>{moment(item.createdAt).format('h:mm A')}</td>
                                    <td>Rs {item.orderAmount}</td>
                                    <td>
                                        <select className='form-select text-capitalize' onChange={handleStatus} >
                                            <option value={""}>Select Status</option>
                                            {item.orderStatus.map((status) => (
                                                !status.isCompleted ?
                                                    <option name={status.type} value={status.type} selected={status.isCompleted}>{status.type}</option> :
                                                    null
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button className='btn btn-sm me-3 btn-neutral' disabled={loading} onClick={() => handleUpdate(item._id)}>Update</button>
                                        <button className='btn btn-sm me-3 btn-neutral'>View</button>
                                    </td>
                                    <td><p>{item.orderStatus[3].isCompleted ? <i className='bi bi-check text-success d-flex' style={{ fontSize: "2rem" }}></i> : !item.orderStatus[3].isCompleted && item.orderStatus[4].isCompleted && <i className='bi bi-x text-danger d-flex' style={{ fontSize: "2rem" }}></i>}</p></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer border-0 py-5"><span className="text-muted text-sm">Showing {orders.length} items out of 250 results
                    found</span></div>
            </div>
        </section>
    )
}

export default Orders