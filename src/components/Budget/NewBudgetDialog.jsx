import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useState } from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function NewBudgetDialog(props) {
    const { budgetList, setBudgetList, currentId, setCurrentBudget, itemList } = props;
    const [ open, setOpen ] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <Button variant="contained" sx={{width:"25%"}}endIcon={<CurrencyExchangeIcon />} disabled={currentId===''} onClick={handleClickOpen}>
                Edit Budget
            </Button>
            <Dialog open={open} onClose={handleClose}
            slotProps={{
                paper: {
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const newBudget = formJson.newBudget;
                    const newUser = {
                        dateCreated: currentId,
                        budget: newBudget,
                        budgetItems: itemList
                    }
                    setBudgetList((prevlist => prevlist.filter(user => user.dateCreated !== currentId)))
                    setBudgetList(prevlist => [...prevlist, newUser])
                    setCurrentBudget(newBudget)
                    handleClose();
                  },
                },
              }}>
                <DialogTitle>Set New Budget</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the new budget here:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="newBudget"
                        name="newBudget"
                        label="New Budget"
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