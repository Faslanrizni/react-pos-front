import React, {useState} from "react";
import {Modal} from 'react-bootstrap'
import axios from "axios";

interface Customer{
    _id:string,
    name:string,
    address:string,
    salary:number
}
const Customer:React.FC=()=> {

    const [customers,setCustomers] = useState<Customer[]>([])

    const [modelState,setModelState] = useState<boolean>(false);

    const [name,setName]= useState('');
    const [address,setAddress]= useState('');
    const [salary,setSalary]= useState<number | ''>('');

    const [selectedCustomerId,setSelectedCustomerId]= useState('');
    const [updateName,setUpdateName]= useState('');
    const [updateAddress,setUpdateAddress]= useState('');
    const [updateSalary,setUpdateSalary]= useState<number | ''>('');
    const saveCustomer=async ()=>{
        try {
            const response= await axios.post("http://localhost:3000/api/v1/customers/create",{
                name,address,salary
            });
            console.log(response);
            setName('')
            setSalary('')
            setAddress('');
        }catch (e){
            console.log(e)
        }
    }
    const updateCustomer= async ()=>{
        try{

            await axios.put('http://localhost:3000/api/v1/customers/update/'+selectedCustomerId,{
                name:updateName,address:updateAddress,salary:updateSalary
            });
            setModelState(false);


        }catch (e){
            console.log(e)
        }
    }
    const findAllCustomers= async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/customers/find-all?searchText=&page=1&size=10');
        setCustomers(response.data);
    }
    const deleteCustomer=async(id)=>{
        await axios.delete("http://localhost:3000/api/v1/customers/delete-by-id"+id)
    }
    const  loadModel=async (id) => {
       const customer =  await axios.get("http://localhost:3000/api/v1/customers/find-by-id"+id)
        console.log(customer.data);
       setSelectedCustomerId(customer.data._id)
       setUpdateName(customer.data.name)
        setUpdateAddress(customer.data.address)
        setUpdateSalary(parseFloat(customer.data.salary))

       setModelState(true);

    }



    return(
        <>
            <br/>
            <div className="container">
                <div className="row">
                     <div className="col-12 col-sm-6 col-md-4">
                         <div className="form-group">
                             <label htmlFor="customerName">Customer Name</label>
                             <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className={'form-control'} id={'customerName'}/>
                         </div>
                     </div>
                     <div className="col-12 col-sm-6 col-md-4">
                         <label htmlFor="customerAddress">Customer Address</label>
                         <input value={address} type="text" onChange={(e)=>{setAddress(e.target.value)}}className={'form-control'} id={'customerAddress'}/>
                     </div>
                     <div className="col-12 col-sm-6 col-md-4">
                             <label htmlFor="customerSalary">Customer Salary</label>
                             <input value={salary} type="text" onChange={(e)=>{setSalary(e.target.value==''?'':parseFloat(e.target.value))}} className={'form-control'} id={'customerSalary'}/>
                     </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 ">
                        <button onClick={saveCustomer} className={'btn btn-primary col-12'}>Save Customer</button>
                    </div>

                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <form className={'col-12'}>
                            <input type="search" className={'form-control'} placeholder={'search customer'}/>
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
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Delete option</th>
                                <th>Update option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((customer,index)=>
                            <tr key={index}>
                                <td>#{index}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.salary}</td>
                                <td>
                                    <button
                                        onClick={()=>{
                                            if (confirm('are you sure')){
                                                deleteCustomer(customer._id)
                                            }
                                        }
                                        }
                                        className={'btn btn-outline-danger bnt-sm'}>Delete</button>
                                </td>
                                <td>
                                    <button
                                        onClick={()=>{
                                            loadModel(customer._id);
                                        }
                                        }
                                        className={'btn btn-outline-success bnt-sm'}>Update</button>
                                </td>
                            </tr>
                            )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            {/*===============*/}

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <Modal show={modelState}>

                <div className='p-4'>
                    <h2>Update Customer</h2>
                    <hr/>

                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName}
                                   onChange={(e)=>setUpdateName(e.target.value)}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateAddress(e.target.value)}
                                type="text" defaultValue={updateAddress} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateSalary(parseFloat(e.target.value))}
                                type="text" defaultValue={updateSalary} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={()=>updateCustomer()}
                        >Update Customer</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12' onClick={()=>setModelState(false)}>Close Modal</button>
                    </div>

                </div>

            </Modal>

            {/*===============*/}
        </>
    )
}
export default Customer;