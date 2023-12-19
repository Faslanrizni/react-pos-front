import React from "react";

function Order() {
    const style:React.CSSProperties={
        marginBottom:'20px'
    }
    const bottomContextStyle:React.CSSProperties={
        width:'100%',
        display:'flex',
        alignItems:"center",
        justifyContent:'space-between'
    }
    return (
        <>
            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="customerName">select Customer</label>
                            <select  id="customer" className={'form-control'}>
                                <option value="choose" disabled  defaultValue={'choose'}>choose</option>
                                <option value="#">Customer 2</option>
                                <option value="#">Customer 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="name">Customer Name</label>
                            <input type="text" disabled className={'form-control'} id={'name'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="address">Customer Address</label>
                            <input type="text" disabled className={'form-control'} id={'address'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="address">Salary</label>
                            <input type="number" disabled className={'form-control'} id={'salary'}/>
                        </div>
                    </div>
                </div>
                <br/>
                <hr/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="customerName">select Product</label>
                            <select  id="product" className={'form-control'}>
                                <option value="choose" disabled  defaultValue={'choose'}>choose</option>
                                <option value="#">Customer 2</option>
                                <option value="#">Customer 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="description">Product description</label>
                            <input type="text" disabled className={'form-control'} id={'description'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={style}>
                        <div className="form-group">
                            <label htmlFor="price">Unit price</label>
                            <input type="number" disabled className={'form-control'} id={'price'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={style}>
                        <div className="form-group">
                            <label htmlFor="qtyOnHand">QTY on hand</label>
                            <input type="number" disabled className={'form-control'} id={'qtyOnHand'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={style}>
                        <div className="form-group">
                            <label htmlFor="qty">QTY</label>
                            <input type="number" className={'form-control'} id={'qty'}/>
                        </div>

                    </div>

                </div>
                <hr/>

                <div className="row">
                    <div className="col-12 ">
                        <button className={'btn btn-primary col-12'}>Add Product</button>
                    </div>
                </div>
                <hr/>

                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className={'table table-hover table-bordered'}>
                            <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th>Unit price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Delete option</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>#1001</td>
                                <td>Nimal silva</td>
                                <td>258</td>
                                <td>100</td>
                                <td>25000</td>
                                <td>
                                    <button className={'btn btn-outline-danger bnt-sm'}>Remove</button>
                                </td>

                            </tr>

                            </tbody>

                        </table>

                        <br/>

                        <div className="bottom-context" style={bottomContextStyle}>
                            <div className="total-outer">
                                <h1>Total: 2500</h1>
                            </div>
                            <div className="place-order">
                                <button className={'btn btn-primary'}>Place order</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Order;