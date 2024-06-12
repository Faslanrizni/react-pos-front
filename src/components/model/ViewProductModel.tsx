import React from 'react';
import { Modal } from 'react-bootstrap';
import Product from "../Product";

interface ViewProductModalProps {
    show: boolean;
    handleClose: () => void;
    product: Product | null;
}

const ViewProductModal: React.FC<ViewProductModalProps> = ({ show, handleClose, product }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product ? (
                    <>
                        <div className="text-center">
                            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Unit Price:</strong> {product.unitPrice}</p>
                        <p><strong>Quantity on Hand:</strong> {product.qtyOnHand}</p>
                    </>
                ) : (
                    <p>No product selected </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewProductModal;
