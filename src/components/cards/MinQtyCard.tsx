import React from "react";

interface ProductProps {
    image:string,
    name:string,
    description:string

}

function MinQtyCard(props:ProductProps){
    const style:React.CSSProperties={
        width:'100%',
        marginBottom:'10px'
    }

    return(
        <div className="card" style={style}>
            <img src={props.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className={'card-title'}>{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href="#" className={'btn btn-primary'}>View more</a>
                </div>
        </div>
    )
}
export default MinQtyCard;