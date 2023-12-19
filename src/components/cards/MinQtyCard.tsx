import React from "react";

function MinQtyCard(){
    const style:React.CSSProperties={
        width:'100%',
        marginBottom:'10px'
    }

    return(
        <div className="card" style={style}>
            <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                    <a href="" className={'btn btn-primary'}>Go Somewhere</a>
                </div>
        </div>
    )
}
export default MinQtyCard;