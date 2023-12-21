import React, {ChangeEvent, useEffect, useState} from "react";
import Customer from "./Customer";
import {storage} from "../config/firebase";
import axios from "axios";

interface Product{
    _id:string,
    name:string,
    description:string,
    unitPrice:string,
    salary:number,
    qtyOnHand:number
    image:string
}

const Product:React.FC=()=> {

    const [products,setProducts] = useState<Product[]>([])

    const [image,setImage]=useState<File | null>(null)

    const [name,setName] = useState('');

    const [description,setDescription]= useState('');
    const [unitPrice,setUnitPrice]= useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]= useState<number | ''>('');

    const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files && e.target.files[0]){
        setImage(e.target.files)
    }
    }
    const saveProduct=async()=>{
        const imageUrl = 'data:image/jpeg;base64,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';

        /*if (image){
            const storageRef = storage.ref('image/${Math.random()+'-'+image.name}');
            storageRef.put(image).then(()={
                storageRef.getDownloadURL().then((url)=>{
                    console.log(url)
                })
            })
        }*/

        try {
            await axios.post("http://localhost:3000/api/v1/products/create",{
                name,description,unitPrice,qtyOnHand,image:imageUrl
            });

            setName('')
            setDescription('')
            setQtyOnHand('')
            setUnitPrice('')


            findAllProducts();
        }catch (e){
            console.log(e)
        }
    }
    useEffect(()=>{
        findAllProducts();
    },[])

/*    const updateProduct= async ()=>{
        try{

            await axios.put('http://localhost:3000/api/v1/customers/update/'+selectedCustomerId,{
                name:updateName,address:updateAddress,salary:updateSalary
            });
            setModelState(false);


        }catch (e){
            console.log(e)
        }
    }*/
    const findAllProducts= async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
    }
    const deleteProducts=async(id)=>{
        await axios.delete("http://localhost:3000/api/v1/products/delete-by-id/"+id)
        findAllProducts();
    }

/*    const  loadModel=async (id) => {
        const customer =  await axios.get("http://localhost:3000/api/v1/customers/find-by-id"+id)
        console.log(customer.data);
        setSelectedCustomerId(customer.data._id)
        setUpdateName(customer.data.name)
        setUpdateAddress(customer.data.address)
        setUpdateSalary(parseFloat(customer.data.salary))

        setModelState(true);

    }*/

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
                            <input value={name} type="text" onChange={(e)=>setName(e.target.value)} className={'form-control'} id={'productName'}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="price">Unit price</label>
                            <input value={unitPrice} type="text" onChange={(e)=>setUnitPrice(parseFloat(e.target.value))} className={'form-control'} id={'price'}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="qty">QTY on hand</label>
                            <input value={qtyOnHand} type="text" onChange={(e)=>setQtyOnHand(parseFloat(e.target.value))} className={'form-control'} id={'qty'}/>
                        </div>

                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={style}>
                        <div className="form-group">
                            <label htmlFor="qty">product image</label>
                            <input  onChange={handleImage} type="file" className={'form-control'} id={'image'}/>
                        </div>

                    </div>
                    <div className="col-12 " style={style}>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={5} className={'form-control'} id={'description'}/>
                        </div>

                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 ">
                        <button onClick={saveProduct} className={'btn btn-primary col-12'}>Save Product</button>

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
                            {products.map((product,index)=>
                            <tr>
                                <td>#{index}</td>
                                <td>{product.name}</td>
                                <td>{product.qtyOnHand}</td>
                                <td>{product.unitPrice}</td>
                                <td>
                                    <button className={'btn btn-outline-danger bnt-sm'}
                                            onClick={()=>{
                                                if(confirm('sre u sure')){
                                                    deleteProducts(product._id)}
                                            }}
                                    >Delete</button>
                                </td>
                                <td>
                                    <button className={'btn btn-outline-success bnt-sm'}
                                            onClick={()=>alert('are u sure to update')}
                                    >Update</button>
                                </td>
                                <td>
                                    <button className={'btn btn-outline-info bnt-sm'}>View</button>
                                </td>
                            </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product;