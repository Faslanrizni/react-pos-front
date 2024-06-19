import React, {useEffect, useState} from "react";
import Customer from "./Customer";
import axios from 'axios';
// import customer from "./Customer";
// import firebase from "firebase/compat";
// import Value = firebase.remoteConfig.Value;

const Order : React.FC=()=>{
    const style:React.CSSProperties={
        marginBottom:'20px'
    }
    const bottomContextStyle:React.CSSProperties={
        width:'100%',
        display:'flex',
        alignItems:"center",
        justifyContent:'space-between'
    }
    const totalTextColor:React.CSSProperties={
        color:'red',
        margin:'0'

    }

    const [customers, setCustomers]=useState<Customer[]>([])

    // const [name,setName]=useState('');

    const [address,setAddress]=useState('');
    const [salary,setSalary]=useState<number | ''>('');


    useEffect(()=>{
        findAllCustomers()
    })

    const findAllCustomers= async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/customers/find-all?searchText=&page=1&size=10');
        setCustomers(response.data);
        console.log(response.data)

    }
    const getCustomerById = async (id: string)=>{
        const customer = await axios.get('http://localhost:3000/api/v1/customers/find-by-id/'+id);
        console.log(customer.data)
        // setName(customer.data.name)
        setAddress(customer.data.address)
        setSalary(parseFloat(customer.data.salary))
    }


    return (
        <>
            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="customerName">select Customer</label>
                            <select  id="customer" className={'form-control'} onChange={(e)=>{
                                getCustomerById(e.target.value)
                            }}>
                                {customers.map((customer,index)=>(
                                    <option key={index} value={customer._id}>{customer.name}</option>
                                    ))}


                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="address">Customer Address</label>
                            <input value={address} type="text" className={'form-control'} id={'address'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="address">Salary</label>
                            <input value={salary} type="number" className={'form-control'} id={'salary'}/>
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
                            <div className="total-outer" style={totalTextColor}>
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