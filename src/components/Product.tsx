import React from "react";

function Product() {
    const style:React.CSSProperties={
        marginBottom:'20px'
    }
    return (
        <>
            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="customerName">Product Name</label>
                            <input type="text" className={'form-control'} id={'productName'}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="price">Unit price</label>
                            <input type="text" className={'form-control'} id={'price'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="qty">QTY on hand</label>
                            <input type="text" className={'form-control'} id={'qty'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="qty">product image</label>
                            <input type="file" className={'form-control'} id={'image'}/>
                        </div>

                    </div>
                    <div className="col-12 " style={style}>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea rows={5} className={'form-control'} id={'description'}/>
                        </div>

                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 ">
                        <button className={'btn btn-primary col-12'}>Save Product</button>
                    </div>

                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <form className={'col-12'}>
                            <input type="search" className={'form-control'} placeholder={'search Product'}/>
                        </form>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className={'table table-hover table-bordered'}>
                            <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th>QTY on hand</th>
                                <th>Unit price</th>
                                <th>Delete option</th>
                                <th>Update option</th>
                                <th>see more</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>#1001</td>
                                <td>Nimal silva</td>
                                <td>Colombo</td>
                                <td>25000</td>
                                <td>
                                    <button className={'btn btn-outline-danger bnt-sm'}>Delete</button>
                                </td>
                                <td>
                                    <button className={'btn btn-outline-success bnt-sm'}>Update</button>
                                </td>
                                <td>
                                    <button className={'btn btn-outline-info bnt-sm'}>View</button>
                                </td>
                            </tr>

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product;