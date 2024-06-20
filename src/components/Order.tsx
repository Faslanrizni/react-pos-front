import React, {useEffect, useState} from "react";
import Customer from "./Customer";
import AxiosInstance from '../config/axiosInstance';
import Product from "./Product";
// import customer from "./Customer";
// import firebase from "firebase/compat";
// import Value = firebase.remoteConfig.Value;

interface Cart{
    _id:string | undefined,
    description:string | undefined,
    unitPrice:number | " ",
    qty:number | undefined,
    total:number | undefined
}

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

    const [products,setProducts] = useState<Product[]>([])
    const [cart,setCart] = useState<Cart[]>([])


    const [name,setName] = useState('');
    const [userQty,setUserQty] = useState<number>(0);

    const [description,setDescription]= useState('');
    const [unitPrice,setUnitPrice]= useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]= useState<number | ''>('');

    const [selectedCustomer,setSelectedCustomer]= useState<Customer | null>(null)
    const [selectedProduct,setselectedProduct]= useState<Product | null>(null)

    const [netTotal,setNetTotal] = useState<number>(0)


    useEffect(()=>{
        findAllCustomers()
        findAllProducts();
    },[])

    const setTotal = ()=>{
        let amount = 0

        setNetTotal(0)
        /*cart.map((data)=>{
            amount+=data.total;
            setNetTotal(amount);

        })*/
    }

    const findAllProducts= async ()=>{
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
    }

    const findAllCustomers= async ()=>{
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=1&size=10');
        setCustomers(response.data);
        // console.log(response.data)

    }
    const getCustomerById = async (id: string)=>{
        const customer = await AxiosInstance.get('/customers/find-by-id/'+id);
        setSelectedCustomer(customer.data);
        setAddress(customer.data.address)
        setSalary(parseFloat(customer.data.salary))
    }


    const getProductById = async (id: string)=>{
        const product = await AxiosInstance.get('/products/find-by-id/'+id);
        console.log(product.data)
        setselectedProduct(product.data)
        setName(product.data.name)
        setDescription(product.data.description)
        setQtyOnHand(product.data.qtyOnHand)
        setUnitPrice(product.data.unitPrice)
        // setSalary(parseFloat(customer.data.salary))
    }


    const addTOCart= async (newItem:Cart)=>{
        setCart((prevState)=>[...prevState,newItem]);
        setTotal()
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
                                <option value="">select Value</option>
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
                            <select  id="product" className={'form-control'} onChange={(e)=>{
                                getProductById(e.target.value)
                            }}>
                                <option value="">select Value</option>
                                {products.map((product,index)=>(
                                    <option key={index} value={product._id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={style}>
                        <div className="form-group">
                            <label htmlFor="price">Description</label>
                           <input value={description} type="text" disabled className={'form-control'} id={'description'}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={style}>
                        <div className="form-group">
                            <label htmlFor="price">Unit price</label>
                            <input value={unitPrice} type="number" disabled className={'form-control'} id={'price'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={style}>
                        <div className="form-group">
                            <label htmlFor="qtyOnHand">QTY on hand</label>
                            <input value={qtyOnHand} type="number" disabled className={'form-control'} id={'qtyOnHand'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-2" style={style}>
                        <div className="form-group">
                            <label htmlFor="qty">QTY</label>
                            <input onChange={(e)=>{setUserQty(parseFloat(e.target.value))}} type="number" className={'form-control'} id={'qty'}/>
                        </div>

                    </div>

                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 ">
                        <button className='btn btn-primary col-12' onClick={()=>{
                            const cartProduct:Cart= {
                                _id:selectedProduct._id,
                                description:description,
                                unitPrice:unitPrice,
                                qty:userQty,
                                total:(userQty*(unitPrice?unitPrice:0))
                            }
                            addTOCart(cartProduct);

                        }}>Add Product</button>

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
                            {cart.map((data,index)=>(
                                <tr key={index}>
                                    <td>#{data._id}</td>
                                    <td>{data.description}</td>
                                    <td>{data.unitPrice}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.total}</td>
                                    <td>

                                        <button
                                            onClick={(e)=>{
                                                setCart((prevState)=>prevState.filter((cartData)=>cartData._id!=data._id))
                                                 setTotal()
                                            }}
                                            className={'btn btn-outline-danger bnt-sm'}>Remove</button>

                                    </td>

                                </tr>
                            ))}


                            </tbody>

                        </table>

                        <br/>

                        <div className="bottom-context" style={bottomContextStyle}>
                            <div className="total-outer" style={totalTextColor}>
                                <h1>Total: {netTotal}</h1>
                            </div>
                            <div className="place-order">

                                <button className={'btn btn-primary'} onClick={async ()=>{
                                     await axios.post('/orders/create/',{
                                        date:new Date(),
                                        customerDetails:selectedCustomer,
                                        totalCost:19,
                                        products:cart
                                    });
                                    /*setSelectedCustomer(customer.data);
                                    setAddress(customer.data.address)
                                    setSalary(parseFloat(customer.data.salary))*/

                                    }}>Place order</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Order;