import React, {ChangeEvent, useEffect, useState} from "react";
import Customer from "./Customer";
import {storage} from "../config/firebase";
import axios from "axios";
import {Modal} from "react-bootstrap";

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
    const [modalState, setModalState]=useState<boolean>(false);
    const [image,setImage]=useState<File | null>(null)
    const [updateImage, setUpdateImage] = useState(null);

    const [name,setName] = useState('');

    const [description,setDescription]= useState('');
    const [unitPrice,setUnitPrice]= useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]= useState<number | ''>('');
    const [updateDescription,setUpdateSetDescription]= useState('');
    const [updateName,setUpdateName]= useState('');
    const [updateUnitPrice,setUpdateUnitPrice]= useState<number | ''>('');
    const [updateQtyOnHand,setUpdateQtyOnHand]= useState<number | ''>('');
    const [selectedProductId,setSelectedProductId]=useState('');

    const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files && e.target.files[0]){
        setImage(e.target.files)
    }
    }
    const saveProduct=async()=>{
        let imageUrl = '';
        if (image) {
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random() + '-' + image.name}`);
                const snapshot = await imageRef.put(image);
                imageUrl = await snapshot.ref.getDownloadURL();
            } catch (e) {
                console.log("Image upload error: ", e);
            }
        }

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
    const updateProduct= async ()=>{
        let imageUrl = '';
        if (image) {
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random() + '-' + image.name}`);
                const snapshot = await imageRef.put(image);
                imageUrl = await snapshot.ref.getDownloadURL();
            } catch (e) {
                console.log("Image upload error: ", e);
            }
        }
        try{

            await axios.put('http://localhost:3000/api/v1/products/update/'+selectedProductId,{
                name:updateName,unitPrice:updateUnitPrice,qty:updateQtyOnHand,description:updateDescription
            });
            setModalState(false);
            findAllProducts();

        }catch (e){
            console.log(e)
        }
    }
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

    const loadModal= async (id: string)=>{
        const product = await axios.get('http://localhost:3000/api/v1/products/find-by-id/'+id);
        console.log(product.data)
        setSelectedProductId(product.data._id)
        setUpdateName(product.data.name)
        setUpdateUnitPrice(parseFloat(product.data.unitPrice))
        setUpdateQtyOnHand(product.data.qtyOnHand)
        setUpdateSetDescription(product.data.description)
        setUpdateImage(null);



        setModalState(true);
    }

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
                                           onClick={()=> loadModal(product._id)}
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

            <Modal show={modalState}>

                <div className='p-4'>
                    <h2>Update Product</h2>
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
                                onChange={(e)=>setUpdateUnitPrice(parseFloat(e.target.value))}
                                type="text" defaultValue={updateUnitPrice} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateQtyOnHand(parseFloat(e.target.value))}
                                type="text" defaultValue={updateQtyOnHand} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateSetDescription(e.target.value)}
                                type="text" defaultValue={updateDescription} className='form-control'/>
                        </div>
                        <br/>
                    </div>



                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={()=>updateProduct()}
                        >Update Customer</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close</button>
                    </div>

                </div>

            </Modal>
        </>
    )
}
export default Product;