import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useState } from 'react';

export default function AddTaskDialog(props) {
    const {currentId, budgetList, setBudgetList, currentBudget, itemList, setItemList } = props;
    const [ open, setOpen ] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <Button disabled={currentId===''}onClick={handleClickOpen}>
                Add New Expense
            </Button>
            <Dialog open={open} onClose={handleClose}
            slotProps={{
                paper: {
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const newItemName = formJson.newItemName;
                    const newItemCost = formJson.newItemCost;
                    let currentItemList  = itemList;
                    if (currentItemList.length !== 0) {
                        currentItemList = [...currentItemList, {
                            name: newItemName,
                            cost: newItemCost,
                            itemId: currentItemList[currentItemList.length - 1].itemId + 1
                        }]
                    } else {
                        currentItemList = [...currentItemList, {
                            name: newItemName,
                            cost: newItemCost,
                            itemId: 1
                        }]
                    }
                    
                    const idCheck  = currentId;
                    setItemList(currentItemList)
                    const replaceBudgetUser = {
                        dateCreated: idCheck,
                        budget: currentBudget,
                        budgetItems: currentItemList
                    }
                    setBudgetList((prevlist => prevlist.filter(user => user.dateCreated !== idCheck)))
                    setBudgetList(prevlist => [...prevlist, replaceBudgetUser])
                    handleClose();
                  },
                },
              }}>
                <DialogTitle>Set Budget Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the new budget item here:
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="newItemName"
                        name="newItemName"
                        label="New Budget Item"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="newItemCost"
                        name="newItemCost"
                        label="New Item Cost"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                 </DialogContent>
                 <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}