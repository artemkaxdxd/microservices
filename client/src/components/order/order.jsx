import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

export const Order = () => {
  const [modalCreateIsOpen, setCreateIsOpen] = useState(false);
  const [modalUpdateIsOpen, setUpdateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [carId, setCarId] = useState('');

  useEffect(() => {
    try {
        fetch("http://localhost:3003/api/order")
        .then((response) => response.json())
        .then((data) => setOrderData(data));
    } catch (error) {
        setOrderData([]);
        console.log("Error fetching order data ->", error)
    }

  }, []);

  const onSubmitCreate = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            title,
            description,
            status,
            customerId,
            carId
        })
    };

    fetch('http://localhost:3003/api/order', requestOptions)
        .then(response => response.json())
        .then(data => setOrderData([...orderData, data]));

    clearFields();
    closeModal();
  }

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
            status,
            customerId,
            carId
        })
    };

    fetch(`http://localhost:3003/api/order/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => setOrderData([...orderData.filter((order) => order.id != id), data]));

    clearFields();
    closeModal();
  }

  const onSubmitDelete = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:3003/api/order/${id}`, { method: 'DELETE' })
    .then(() => setOrderData([...orderData.filter((order) => order.id != id)]));

    clearFields();
    closeModal();
  }

  function openModal($event) {
    if ($event.target.id === "create") {
        setCreateIsOpen(true);
    } else if ($event.target.id === "update") {
        setUpdateIsOpen(true);
    } else if ($event.target.id === "delete") {
        setDeleteIsOpen(true);
    }
  }

  function closeModal() {
    setCreateIsOpen(false);
    setDeleteIsOpen(false);
    setUpdateIsOpen(false);
  }

  const clearFields = () => {
    setId('');
    setTitle('');
    setDescription('');
    setStatus('');
    setCarId('');
    setCustomerId('');
  }

  return (
    <div className="container order-container">
        <div className='menu'>
            <div className='head-text'>
                <Link to="/">Home</Link>
                <p>{'>'}</p>
                <h1>Order</h1>
            </div>
            <div className="buttons-menu">
                <button className="get-orders-btn">Get all orders</button>
                <button className="create-order-btn" id='create' onClick={openModal}>Create order</button>
                <button className="update-order-btn" id='update' onClick={openModal}>Update order</button>
                <button className="delete-order-btn" id='delete' onClick={openModal}>Delete order</button>
            </div>
        </div>
        <div className="table">
            {
            orderData.map((item, id) =>
                <div key={id}><pre>{JSON.stringify(item)}</pre></div>
            )
            }
        </div>
        <Modal
            className="modal"
            isOpen={modalCreateIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Order Modal"
        >
            <div className='modal-content'>
                <h2>Create order</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <input 
                    type="text"           
                    value={id.value}
                    onChange={(e) => setId(e.target.value)} 
                    />
                    <label>Title</label>
                    <input 
                    type="text"           
                    value={title.value}
                    onChange={(e) => setTitle(e.target.value)} 
                    />
                    <label>Description</label>
                    <input 
                    type="text"           
                    value={description.value}
                    onChange={(e) => setDescription(e.target.value)} 
                    />
                    <label>Status</label>
                    <input 
                    type="text"           
                    value={status.value}
                    onChange={(e) => setStatus(e.target.value)} 
                    />
                    <label>Customer Id</label>
                    <input 
                    type="text"           
                    value={customerId.value}
                    onChange={(e) => setCustomerId(e.target.value)} 
                    />
                    <label>Order Id</label>
                    <input 
                    type="text"           
                    value={carId.value}
                    onChange={(e) => setCarId(e.target.value)} 
                    />
                    <button disabled={id === ''} onClick={onSubmitCreate}>Create order</button>
                </form>
            </div>
        </Modal>
        <Modal
            className="modal"
            isOpen={modalUpdateIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Order Modal"
        >
            <div className='modal-content'>
                <h2>Update order</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <select value={id} onChange={(e) => setId(e.target.value)} >
                    <option>{ 'Please Choose' }</option>
                    {
                        orderData.map((order, idx) => <option key={idx}>{ order.id }</option> )
                    }</select>
                    <label>Title</label>
                    <input 
                    type="text"           
                    value={title.value}
                    onChange={(e) => setTitle(e.target.value)} 
                    />
                    <label>Description</label>
                    <input 
                    type="text"           
                    value={description.value}
                    onChange={(e) => setDescription(e.target.value)} 
                    />
                    <label>Status</label>
                    <input 
                    type="text"           
                    value={status.value}
                    onChange={(e) => setStatus(e.target.value)} 
                    />
                    <label>Customer Id</label>
                    <input 
                    type="text"           
                    value={customerId.value}
                    onChange={(e) => setCustomerId(e.target.value)} 
                    />
                    <label>Order Id</label>
                    <input 
                    type="text"           
                    value={carId.value}
                    onChange={(e) => setCarId(e.target.value)} 
                    />
                    <button disabled={id === ''} onClick={onSubmitUpdate}>Update order</button>
                </form>
            </div>
        </Modal>
        <Modal
            className="modal"
            isOpen={modalDeleteIsOpen}
            onRequestClose={closeModal}
            contentLabel="Delete Order Modal"
        >
            <div className='modal-content'>
                <h2>Delete order</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <select value={id} onChange={(e) => setId(e.target.value)} > 
                    <option>{ 'Please Choose' }</option>
                    {
                        orderData.map((order, idx) => <option key={idx}>{ order.id }</option> )
                    }</select>
                    <button disabled={id === ''} onClick={onSubmitDelete}>Delete Order</button>
                </form>
            </div>
        </Modal>
    </div>
  );
}