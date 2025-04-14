import { useState, useEffect } from 'react';
import NewBudgetDialog from './NewBudgetDialog';
import AddTaskDialog from './AddTaskDialog';
import Button from '@mui/material/Button';
import './Budget.css';

function Budget() {

    const usersTest = [{dateCreated: (Date.now() - 1000 * 60 * 60 * 24 * 7), name: "joshua"}, 
        {dateCreated: (Date.now() - 1000 * 60 * 60 * 24 * 5), name: "mike"}, 
        {dateCreated: (Date.now() - 1000 * 60 * 60 * 24 * 6), name:"sam"}, 
        {dateCreated: (Date.now() - 1000 * 60 * 60 * 24 * 2), name: "jinggoy"}]

    const [currentId, setCurrentId] = useState('')
    const [currentBudget, setCurrentBudget] = useState(0)
    const [itemList, setItemList] = useState([])
    // date created // budget // budgetItems
    const [budgetList, setBudgetList] = useState([])
    // date created
    const [userList, setUserList] = useState(usersTest)
    const [currentName, setCurrentName] = useState('')
    const [total, setTotal] = useState(0)
    const [totalClassName, setTotalClassName] = useState('green');
    
    const checkExistingBudget = (dateId) => {
        // const userCheck = budgetList.filter((user) => user.dateCreated === dateIdI
        setItemList([])
        let userCheck = budgetList;
        const idCheck = dateId;
        userCheck = userCheck.filter(user => user.dateCreated === idCheck)
        if (userCheck.length < 1) {
            const newBudgetUser = {
                dateCreated: idCheck,
                budget: 0,
                budgetItems: [],
            }
            setBudgetList(prevlist => [...prevlist, newBudgetUser])
            setCurrentBudget(0)
        } else {
            setCurrentBudget(userCheck[0].budget)
            setItemList(userCheck[0].budgetItems)
        }
    }

    const handleDeleteItem = (id) => {
        setItemList(previtems => previtems.filter(item => item.itemId !== id))
    }

    const UpdateTotal = () => {
        useEffect(() => {
            let sum = currentBudget;
            const items = itemList;
            for (const item of items) {
                sum -= Number(item.cost)
            }
            setTotal(sum);
            if (Number(sum) > 0) {
                setTotalClassName('green');
            } else if (Number(sum) < 0) {
                setTotalClassName('red');
            } else {
                setTotalClassName('');
            }
        },[currentBudget, itemList] )
    }

    const handleSelectorChange = (event) => {
        const parsedSelectorValue = event.target.value.split(" || ")
        setCurrentId(parsedSelectorValue[1])
        checkExistingBudget(parsedSelectorValue[1])
        setCurrentName(parsedSelectorValue[0])
    }

    const DisplayItemList = (props) => {
        const {itemList} = props;
        return (
            itemList.map((item) => {
                return <div key={item.itemId}>
                    Expense: {item.name} Cost: {item.cost} Expense Id: {item.itemId} 
                    <Button onClick={() => handleDeleteItem(item.itemId)}>Delete Item</Button>
                </div>
            })
        )
    }

    const SelectOptions = (props) => {
        const { users } = props;
        
        return (
            users.map((user) => {
                return <option key={user.dateCreated}>{user["name"] + " || " + user["dateCreated"]}</option>
            })
        )
    }

    return (
        <div className = "Budget">
            <p>Inital Budget: {currentBudget}</p>
            <p>User: {currentName}</p>
            <p>User Created On: {currentId}</p>
            <p>Current Budget - Expenses: <span className={totalClassName}>{total}</span></p>
            <select onChange={handleSelectorChange}>
                <option>Select</option>
                <SelectOptions users={userList}/>
            </select>
            <NewBudgetDialog budgetList={budgetList} setBudgetList={setBudgetList} currentId={currentId} setCurrentBudget={setCurrentBudget} itemList={itemList}/>
            <AddTaskDialog currentId={currentId} setBudgetList={setBudgetList} budgetList={budgetList} currentBudget={currentBudget} itemList={itemList} setItemList={setItemList}/>
            <DisplayItemList itemList={itemList}/> 
            {/* display total */}
            <UpdateTotal />
        </div>
    );
}

export default Budget;