import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    /* const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState(''); */
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredUsernameRef = nameInputRef.current.value;
        const enteredAgeRef = ageInputRef.current.value;

        if (enteredUsernameRef.trim().length === 0 || enteredAgeRef.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age(non-empty values).'
            });
            return;
        };
        if (+enteredAgeRef < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age(>0).'
            });
            return;
        };
        // getting the props on the top most common component and passing it upwards through a function
        props.onAddUser(enteredUsernameRef, enteredAgeRef);
        // logic for resetting when Add user is pressed
        nameInputRef.current.value = ''; // accessing dom elements like this is not always recommended
        ageInputRef.current.value = ''; // here we are doing it only because we want to reset user input
        // why use "ref" instead of "states" - use in read only cases.
        // it helps you reduce code. here you can stop worrying about every key stoke and everything only works when add user is clicked
        /* setEnteredUsername('');
        setEnteredAge(''); */
    }

    /* const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }; */

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onOkay={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username" >Username</label>
                    <input
                        id="username"
                        type="text"
                        /* onChange={usernameChangeHandler}
                        value={enteredUsername} */
                        ref={nameInputRef}
                    />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age"
                        type="number"
                        /* onChange={ageChangeHandler}
                        value={enteredAge} */
                        ref={ageInputRef}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser;