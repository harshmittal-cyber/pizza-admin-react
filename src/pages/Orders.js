import React from 'react'

const Orders = () => {

    const orders = [
        { orderId: "v39485nyx392ym98cx328y9", name: "Raghav Khurana", time: "5 min ago", amount: 350, orderStatus: "placed" },
        { orderId: "v39485nyx392ym98cx328y9", name: "Harsh Mittal", time: "35 min ago", amount: 350, orderStatus: "processing" },
        { orderId: "v39485nyx392ym98cx328y9", name: "Namit Goel", time: "57 min ago", amount: 350, orderStatus: "processing" },
        { orderId: "v39485nyx392ym98cx328y9", name: "Raghav Khurana", time: "3 hrs ago", amount: 350, orderStatus: "processing" },
        { orderId: "v39485nyx392ym98cx328y9", name: "Namit Goel", time: "14.03.22", amount: 350, orderStatus: "processing" },
    ]

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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index} className="text-heading">
                                    <td><p className="text-heading font-semibold text-uppercase">{item.orderId}</p></td>
                                    <td>{item.name}</td>
                                    <td>{item.time}</td>
                                    <td>{item.amount}Rs</td>
                                    <td>
                                        <select className='form-select text-capitalize' name="status" id="">
                                            <option selected={item.orderStatus}>{item.orderStatus}</option>
                                            <option value="placed">Placed</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td><button className='btn btn-sm btn-neutral'>View</button></td>
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