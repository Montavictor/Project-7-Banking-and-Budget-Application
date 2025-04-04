import { useState } from "react";
import "./CreateUser.css";
import bankUsers from "../assets/users.json";

function CreateUser() {
  const [inputData, setInputData] = useState({
    name: "",
    address: "",
    age: "",
    maritalStatus: "",
    email: "",
    initialBalance: "",
  });

  // error handling
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, age, initialBalance, email } = inputData;
    const numAge = parseFloat(age.trim());
    const balance = Number(initialBalance) || 0;
    const users = bankUsers || [];

    // error handling
    if (!name || name.trim() === "") {
      setError("Name is required");
      return;
    } else if (name.match(/^[0-9!@#$%^&*()_+=[\]{}|;:",.<>?\\/]/)) {
      setError("Name cannot start with numbers or special characters");
      return;
    } else if (name.match(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'.-]/)) {
      setError("Name cannot contain special characters");
      return;
    } else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    } else if (!address || address.trim() === "") {
      setError("Address is required");
      return;
    } else if (address.match(/^[!@#$%^&*()_+=[/]{}|:;"<>?]/)) {
      setError("Address cannot start with special characters.");
      return;
    } else if (age.trim() === "" || !numAge) {
      setError("Age is required.");
      return;
    } else if (numAge < 18 || numAge > 120) {
      setError("Age must be between 18 and 120.");
      return;
    } else if (balance < 3000) {
      setError("Initial Deposit cannot be less than PHP 3,000");
      return;
    } else if (balance > 4000000) {
      setError(
        "Maximum Deposit cannot exceed PHP 4,000,000.00. Inaccordance to Anti-Laundering Law"
      );
      return;
    } else if (
      users.find((user) => user.name.toLocaleLowerCase() === name.toLowerCase())
    ) {
      setError(
        "Error: User's Name Already Exists. Is He/She a different person?"
      );
      setShowConfirmation(true);
      return;
    } else {
      createNewUser(users);
    }
  };
  // creating a new user and pushing it to database
  function createNewUser(users) {
    setShowConfirmation(false);

    // creating an ID based on year/month/day/hour/minute/second/miliseconds
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();
    const miliseconds = now.getMilliseconds();

    const dateCreated = `${year}${month}${day}${hour}${minute}${seconds}${miliseconds}`;

    const { name, address, initialBalance, email, age } = inputData;
    const balance = Number(initialBalance) || 0;
    const newUser = {
      name,
      address,
      balance,
      email,
      age,
      dateCreated,
    };

    bankUsers.push(newUser);
    //debug checker
    console.log(bankUsers);
    console.log(users);
  }

  // change handler of all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return (
    <div className="createUser">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputData.name}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            type="text"
            name="address"
            onChange={handleChange}
            value={inputData.address}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
            value={inputData.age}
            required
            min="18"
            max="120"
          />
        </div>
        <div>
          <label htmlFor="initialBalance">Initial Balance:</label>
          <input
            type="number"
            name="initialBalance"
            onChange={handleChange}
            placeholder="Minimum Deposit of PHP 3,000"
            value={inputData.initialBalance}
            min="3000"
            max="4000000"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputData.email}
            required
          />
        </div>
        <div>
          <label htmlFor="maritalStatus">Marital Status:</label>
          <select
            name="maritalStatus"
            value={inputData.maritalStatus}
            onChange={handleChange}
          >
            <option defaultValue disabled>
              Select Option
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <input type="submit" onClick={handleSubmit} className="submitBtn" />
      </form>
      {!!error && <p className="error">{error}</p>}
      {showSuccess && <p className="success">{showSuccess}</p>}
      {showConfirmation && (
        <div className="confirmation">
          <button className="button" onClick={createNewUser}>
            Yes
          </button>
          <button className="button" onClick={() => setShowConfirmation(false)}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateUser;
