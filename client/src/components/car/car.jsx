import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

export const Car = () => {
  const [modalCreateIsOpen, setCreateIsOpen] = useState(false);
  const [modalUpdateIsOpen, setUpdateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [carData, setCarData] = useState([]);
  const [id, setId] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [license, setLicense] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [hp, setHp] = useState('');
  const [colour, setColour] = useState('');
  const [consumptionCity, setConsumptionCity] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [accident, setAccident] = useState('');
  const [description, setDescriptin] = useState('');
  const url = 'http://localhost:3001/api/car';

  useEffect(() => {
    try {
    fetch(url, {      
            method: 'GET',    
            withCredentials: true,    
            crossorigin: true,    
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.text();
            })
            .then((message) => {
                setCarData(JSON.parse(message));
            })
    } catch (error) {
        setCarData([]);
        console.log("Error fetching car data ->", error)
    }
  }, []);

  const onSubmitCreate = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model,
            brand,
            license,
            year,
            mileage,
            colour,
            hp,
            consumptionCity,
            engineCapacity,
            transmission,
            fuelType,
            accident,
            description,
        })
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => setCarData([...carData, data]));

    clearFields();
    closeModal();
  }

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model,
            brand,
            license,
            year,
            mileage,
            colour,
            hp,
            consumptionCity,
            engineCapacity,
            transmission,
            fuelType,
            accident,
            description,
        })
    };

    fetch(`${url}/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => setCarData([...carData.filter((car) => car.id != id), data]));

    clearFields();
    closeModal();
  }

  const onSubmitDelete = (e) => {
    e.preventDefault();
    
    fetch(`${url}/${id}`, { method: 'DELETE' })
    .then(() => setCarData([...carData.filter((car) => car.id != id)]));

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
    setBrand('');
    setModel('');
    setLicense('');
    setYear('');
    setColour('');
    setMileage('');
    setHp('');
    setConsumptionCity('');
    setEngineCapacity('');
    setTransmission('');
    setFuelType('');
    setAccident('');
    setDescriptin('');
  }

  return (
    <div className="container car-container">
        <div className='menu'>
            <div className='head-text'>
                <Link to="/">Home</Link>
                <p>{'>'}</p>
                <h1>Car</h1>
            </div>
            <div className="buttons-menu">
                <button className="create-car-btn" id='create' onClick={openModal}>Create car</button>
                <button className="update-car-btn" id='update' onClick={openModal}>Update car</button>
                <button className="delete-car-btn" id='delete' onClick={openModal}>Delete car</button>
            </div>
        </div>
        <div className="table">
            {
            carData.length ? carData.map((item, id) =>
                <div key={id}><pre>{JSON.stringify(item)}</pre></div>
            ) : ''
            }
        </div>
        <Modal
            className="modal"
            isOpen={modalCreateIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Car Modal"
        >
            <div className='modal-content'>
                <h2>Create car</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Brand</label>
                    <input 
                    type="text"           
                    value={brand.value}
                    onChange={(e) => setBrand(e.target.value)} 
                    />
                    <label>Colour</label>
                    <input 
                    type="text"           
                    value={colour.value}
                    onChange={(e) => setColour(e.target.value)} 
                    />
                    <label>model</label>
                    <input 
                    type="text"           
                    value={model.value}
                    onChange={(e) => setModel(e.target.value)} 
                    />
                    <label>License</label>
                    <input 
                    type="text"           
                    value={license.value}
                    onChange={(e) => setLicense(e.target.value)} 
                    />
                    <label>Year</label>
                    <input 
                    type="text"           
                    value={year.value}
                    onChange={(e) => setYear(e.target.value)} 
                    />
                    <label>Mileage</label>
                    <input 
                    type="text"           
                    value={mileage.value}
                    onChange={(e) => setMileage(e.target.value)} 
                    />
                    <label>HP</label>
                    <input 
                    type="text"           
                    value={hp.value}
                    onChange={(e) => setHp(e.target.value)} 
                    />
                    <label>Consumption City</label>
                    <input 
                    type="text"           
                    value={consumptionCity.value}
                    onChange={(e) => setConsumptionCity(e.target.value)} 
                    />
                    <label>Engine Capacity</label>
                    <input 
                    type="text"           
                    value={engineCapacity.value}
                    onChange={(e) => setEngineCapacity(e.target.value)} 
                    />
                    <label>Transmission</label>
                    <input 
                    type="text"           
                    value={transmission.value}
                    onChange={(e) => setTransmission(e.target.value)} 
                    />
                    <label>Fuel Type</label>
                    <input 
                    type="text"           
                    value={fuelType.value}
                    onChange={(e) => setFuelType(e.target.value)} 
                    />
                    <label>Accident</label>
                    <input 
                    type="text"           
                    value={accident.value}
                    onChange={(e) => setAccident(e.target.value)} 
                    />
                    <button onClick={onSubmitCreate}>Create car</button>
                </form>
            </div>
        </Modal>
        <Modal
            className="modal"
            isOpen={modalUpdateIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Car Modal"
        >
            <div className='modal-content'>
                <h2>Update car</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <select value={id} onChange={(e) => setId(e.target.value)} >
                    <option>{ 'Please Choose' }</option>
                    {
                        carData.length ? carData.map((car, idx) => <option key={idx}>{ car.id }</option> ) : ''
                    }</select>
                    <label>Brand</label>
                    <input 
                    type="text"           
                    value={brand.value}
                    onChange={(e) => setBrand(e.target.value)} 
                    />
                    <label>Colour</label>
                    <input 
                    type="text"           
                    value={colour.value}
                    onChange={(e) => setColour(e.target.value)} 
                    />
                    <label>model</label>
                    <input 
                    type="text"           
                    value={model.value}
                    onChange={(e) => setModel(e.target.value)} 
                    />
                    <label>License</label>
                    <input 
                    type="text"           
                    value={license.value}
                    onChange={(e) => setLicense(e.target.value)} 
                    />
                    <label>Year</label>
                    <input 
                    type="text"           
                    value={year.value}
                    onChange={(e) => setYear(e.target.value)} 
                    />
                    <label>Mileage</label>
                    <input 
                    type="text"           
                    value={mileage.value}
                    onChange={(e) => setMileage(e.target.value)} 
                    />
                    <label>HP</label>
                    <input 
                    type="text"           
                    value={hp.value}
                    onChange={(e) => setHp(e.target.value)} 
                    />
                    <label>Consumption City</label>
                    <input 
                    type="text"           
                    value={consumptionCity.value}
                    onChange={(e) => setConsumptionCity(e.target.value)} 
                    />
                    <label>Engine Capacity</label>
                    <input 
                    type="text"           
                    value={engineCapacity.value}
                    onChange={(e) => setEngineCapacity(e.target.value)} 
                    />
                    <label>Transmission</label>
                    <input 
                    type="text"           
                    value={transmission.value}
                    onChange={(e) => setTransmission(e.target.value)} 
                    />
                    <label>Fuel Type</label>
                    <input 
                    type="text"           
                    value={fuelType.value}
                    onChange={(e) => setFuelType(e.target.value)} 
                    />
                    <label>Accident</label>
                    <input 
                    type="text"           
                    value={accident.value}
                    onChange={(e) => setAccident(e.target.value)} 
                    />
                    <button disabled={id === ''} onClick={onSubmitUpdate}>Update car</button>
                </form>
            </div>
        </Modal>
        <Modal
            className="modal"
            isOpen={modalDeleteIsOpen}
            onRequestClose={closeModal}
            contentLabel="Delete Car Modal"
        >
            <div className='modal-content'>
                <h2>Delete car</h2>
                <button className='close-button' onClick={closeModal}>close</button>
                <form className='form'>
                    <label>Id</label>
                    <select value={id} onChange={(e) => setId(e.target.value)} > 
                    <option>{ 'Please Choose' }</option>
                    {
                        carData.length ? carData.map((car, idx) => <option key={idx}>{ car.id }</option> ) : ''
                    }</select>
                    <button disabled={id === ''} onClick={onSubmitDelete}>Delete Car</button>
                </form>
            </div>
        </Modal>
    </div>
  );
}