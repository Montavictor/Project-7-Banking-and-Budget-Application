import { useState } from 'react';
import './CreateUser.css';
import bankUsers from '../assets/users.json'

function CreateUser() {
    const [inputData, setInputData] = useState({
        name:'',
        address:'',
        age:'',
        maritalStatus:'', 
        email:'',
        initialBalance:'',
    })

    // error handling
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    
    // submit button
    const handleSubmit = (e) =>{
        e.preventDefault();
        const {name, initialBalance, email, age} = inputData;

        // error handling
        if (!name || name.trim === '') {
            setError('Name is required')
            return;
        }
        if (name.match(/^\d/)){
            setError('Name cannot start with a number');
            return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setError('Please enter a valid email address')
            return;
        }
        if (age && (isNaN(age) || age < 18 || age > 120)){
            setError('Age cannot be verified');
            return;
        }
        const balance = parseFloat(initialBalance) || 0;
        if (balance < 0) {
            setError('Initial cannot be less than zero');
            return;
        }   
        const users =[];
        const newUser = {
            name,
            balance,
            email,
            age,
            transactions: [],
            dateCreated: new Date().toISOString(),
        };
        console.log(users);
        bankUsers.push(newUser);
        users.push(newUser);
        console.log(bankUsers);
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputData(inputs => ({
            ...inputs,
            [name]: value,
        }));
    }
    return (
        <div className='createUser'>
            <h1>Create New User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={inputData.name} 
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input 
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={inputData.address}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input 
                        type="number"
                        name="age"
                        onChange={handleChange}
                        value={inputData.age}
                    />
                </div>
                <div>
                    <label htmlFor="initialBalance">Initial Balance:</label>
                    <input 
                        type="number"
                        name="initialBalance"
                        onChange={handleChange}
                        value={inputData.initialBalance}
                    />
                </div>
                <div>
                    <label htmlFor="enail">Email:</label>
                    <input 
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={inputData.email}
                    />
                </div>
                <div>
                    <label htmlFor="maritalStatus">Marital Status:</label>
                    <select 
                        name="maritalStatus"
                        value={inputData.maritalStatus}
                        onChange={handleChange}>
                            <option defaultValue disabled>Select Option</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                    </select>
                </div>
                <input 
                    type="submit"
                    onClick={handleSubmit}
                    className = "submitBtn"
                />
            </form>
        </div>
    )
}

export default CreateUser;