import { useState } from 'react';
import './CreateUser.css';

function CreateUser() {
    const [userData, setUserData] = useState({
        name:'',
        address:'',
        age:'',
        //marriage status
        maritalStatus:'', 
        email:'',
        initialBalance:'',
        createdAt: new Date().toISOString()
    })

    // error handling
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const maritalStatusOptions = [
        {value: 'single', label: 'Single'},
        {value: 'married', label: 'Married'},
        {value: 'divorced', label: 'Divorced'},
        {value: 'widowed', label: 'Widowed'}
    ]
    // submit button
    const handleSubmit = (e) =>{
        e.preventDefault();
        const {name, initialBalance, email, age} = userData;

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

    
    }
}