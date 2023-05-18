import React, { useState, useEffect } from 'react';

const Drone = ({ addDrone }) => {
    const [drones, setDrones] = useState([]);
    const [droneType, setDroneType] = useState('');
    const [makeName, setMakeName] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchDrones();
    }, []);

    const fetchDrones = async () => {
        const auth = localStorage.getItem('user');
        const user = JSON.parse(auth);
        const email = user.email;
        if (auth) {
            const response = await fetch(`http://localhost:5000/dronesData?created_by=${email}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token"))
                }
            });
            const data = await response.json();
            setDrones(data);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!droneType || !makeName || !name) {
            setError('Kindly fill all the details');
            return;
        }
        try {
            const auth = localStorage.getItem('user');
            const user = JSON.parse(auth);
            const response = await fetch('http://localhost:5000/drones', {
                method: 'POST',
                body: JSON.stringify({
                    created_at: new Date(),
                    created_by: user.email,
                    deleted_by: '',
                    deleted_on: '',
                    drone_type: droneType,
                    make_name: makeName,
                    name: name,
                    updated_at: new Date(),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: JSON.parse(localStorage.getItem("token"))
                },
            });
            const data = await response.json();
            if (data.message === 'Missing') {
                setError('Kindly fill all the details');
                return;
            }
            setDroneType('');
            setMakeName('');
            setName('');
            addDrone(data);
            setDrones(prevDrones => [...prevDrones, data]);
            setError('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (droneId) => {
        try {
            await fetch(`http://localhost:5000/drones/${droneId}`, {
                method: 'DELETE',
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token"))
                }
            });
            setDrones(prevDrones => prevDrones.filter(drone => drone._id !== droneId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddClick = () => {
        setShowForm(true);
    };
    // ------------------------------------------------------------------------------------------------------
    return (
        <div className="drone-component">
            <div className="left-section">
            <div><h2 className='addDroneText'>Add Drone To Your Fleet</h2></div>
                <div className={`add-drone-button ${showForm ? 'hide' : ''}`} onClick={handleAddClick}>
                    +
                </div>
                <div className={`drone-form ${showForm ? 'show' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Drone Type"
                            value={droneType}
                            onChange={(event) => setDroneType(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Make Name"
                            value={makeName}
                            onChange={(event) => setMakeName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Drone Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <button type="submit">Add Drone</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
            <div className="right-section">
                <div className="drone-list">
                    {Array.isArray(drones) && drones.length > 0 ? (
                        drones.slice().reverse().map((drone) => (
                            <div className="drone-tile" key={drone._id}>
                                <h3>{drone.name}</h3>
                                <p>
                                    {drone.make_name} - {drone.drone_type}
                                </p>
                                <p>Created at: {new Date(drone.created_at).toLocaleString()}</p>
                                <button onClick={() => handleDelete(drone._id)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No drones found.</p>
                    )}
                </div>
            </div>
        </div>
    );

};

export default Drone;
