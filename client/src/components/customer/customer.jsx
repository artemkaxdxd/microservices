import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

export const Customer = () => {
  const [modalCreateIsOpen, setCreateIsOpen] = useState(false);
  const [modalUpdateIsOpen, setUpdateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [driverLicense, setDtiverLicense] = useState('');
  const url = "http://localhost:3002/api/customers"

  useEffect(() => {
    try {
        fetch(url)
        .then((response) => response.json())
        .then((data) => setCustomerData(data));
    } catch (error) {
        setCustomerData([])
        console.log("Error fetching customer data ->", error)
    }

  }, []);

  const onSubmitCreate = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            name,
            description,
            email,
            age,
            driverLicense
        })
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => setCustomerData([...customerData, data]));

    clearFields();
    closeModal();
  }

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            description,
            email,
            age,
            driverLicense
        })
    };

    fetch(`${url}${id}`, requestOptions)
        .then(response => response.json())
        .then(data => setCustomerData([...customerData.filter((customer) => customer.id != id), data]));

    clearFields();
    closeModal();
  }

  const onSubmitDelete = (e) => {
    e.preventDefault();
    
    fetch(`${url}${id}`, { method: 'DELETE' })
    .then(() => setCustomerData([...customerData.filter((customer) => customer.id != id)]));

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
    setName('');
    setDescription('');
    setEmail('');
    setDtiverLicense('');
    setAge('');
  }

  return (
    <div className="container customer-container">
        <div className='menu'>
            <div className='head-text'>
                <Link to="/">Home</Link>
                <p>{'>'}</p>
                <h1>Customer</h1>
            </div>
            <div className="buttons-menu">
                <button className="get-customers-btn">Get all customers</button>
                <button className="create-customer-btn" id='create' onClick={openModal}>Create customer</button>
                <button className="update-customer-btn" id='update' onClick={openModal}>Update customer</button>
                <button className="delete-customer-btn" id='delete' onClick={openModal}>Delete customer</button>
            </div>
        </div>
        <div className="table">
            {
            customerData.length ? customerData.map((item, id) =>
                <div key={id}><pre>{JSON.stringify(item)}</pre></div>
            ) : ''
            }
        </div>
        <Modal
            className="modal"
            isOpen={modalCreateIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Customer Modal"
        >
            <div className='modal-content'>
                <h2>Create customer</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <input 
                    type="text"           
                    value={id.value}
                    onChange={(e) => setId(e.target.value)} 
                    />
                    <label>Name</label>
                    <input 
                    type="text"           
                    value={name.value}
                    onChange={(e) => setName(e.target.value)} 
                    />
                    <label>Description</label>
                    <input 
                    type="text"           
                    value={description.value}
                    onChange={(e) => setDescription(e.target.value)} 
                    />
                    <label>Email</label>
                    <input 
                    type="text"           
                    value={email.value}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label>Driver License</label>
                    <input 
                    type="text"           
                    value={driverLicense.value}
                    onChange={(e) => setDtiverLicense(e.target.value)} 
                    />
                    <label>Age</label>
                    <input 
                    type="text"           
                    value={age.value}
                    onChange={(e) => setAge(e.target.value)} 
                    />
                    <button disabled={id === ''} onClick={onSubmitCreate}>Create customer</button>
                </form>
            </div>
        </Modal>
        <Modal
            className="modal"
            isOpen={modalUpdateIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Customer Modal"
        >
            <div className='modal-content'>
                <h2>Update customer</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <select value={id} onChange={(e) => setId(e.target.value)} >
                    <option>{ 'Please Choose' }</option>
                    {
                        customerData.length ? customerData.map((customer, idx) => <option key={idx}>{ customer.id }</option> ) : ''
                    }</select>
                    <label>Name</label>
                    <input 
                    type="text"           
                    value={name.value}
                    onChange={(e) => setName(e.target.value)} 
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
                    value={email.value}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label>Age</label>
                    <input 
                    type="text"           
                    value={driverLicense.value}
                    onChange={(e) => setDtiverLicense(e.target.value)} 
                    />
                    <label>Customer Id</label>
                    <input 
                    type="text"           
                    value={age.value}
                    onChange={(e) => setAge(e.target.value)} 
                    />
                    <button disabled={id === ''} onClick={onSubmitUpdate}>Update customer</button>
                </form>
            </div>
        </Modal>
        <Modal
            className="modal"
            isOpen={modalDeleteIsOpen}
            onRequestClose={closeModal}
            contentLabel="Delete Customer Modal"
        >
            <div className='modal-content'>
                <h2>Delete customer</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <select value={id} onChange={(e) => setId(e.target.value)} > 
                    <option>{ 'Please Choose' }</option>
                    {
                        customerData.length ? customerData.map((customer, idx) => <option key={idx}>{ customer.id }</option> ) : ''
                    }</select>
                    <button disabled={id === ''} onClick={onSubmitDelete}>Delete Customer</button>
                </form>
            </div>
        </Modal>
    </div>
  );
}