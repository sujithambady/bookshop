import React, { useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import AddBook from '../addBook/addBook';
import ViewAddedBook from '../viewAddedBooks/viewAddedBooks';
import ViewAllBookings from '../viewAllBookings/viewAllBookings';

function Home() {
    const [addFormShow, setAddFormShow] = useState(false);
    const [viewAddedItem, setViewAddedItem] = useState(false);
    const [viewPackBookings, setViewPackBookings] = useState(false);
    const [viewLiveBook, setViewLiveBook] = useState(false);
    const [cir, setCir] = useState(false);

    const navigate = useNavigate();

    const viewAddedItems = () => {
        console.log('View working..!!');
        setAddFormShow(false);
        setViewAddedItem(true);
        setViewPackBookings(false);
        setViewLiveBook(false);
        setCir(false);
    };

    const viewAllSlots = () => {
        setAddFormShow(false);
        setViewAddedItem(false);
        setViewPackBookings(true);
        setViewLiveBook(false);
        setCir(false);
    };

    const addItems = () => {
        console.log('Add working..!!');
        setAddFormShow(true);
        setViewAddedItem(false);
        setViewPackBookings(false);
        setViewLiveBook(false);
        setCir(false);
    };

    const logOut = () => {
        if (window.confirm('Are you sure want to logout?')) {
            localStorage.clear();
            navigate('/login');
        }
    };

    const circulation = () => {
        console.log('Circulation Working..!!');
        setViewPackBookings(false);
        setViewAddedItem(false);
        setAddFormShow(false);
        setViewLiveBook(false);
        setCir(true);
    };

    return (
        <>
            <div>
                <header className='bg1'>
                    <div className='row'>
                        <div className='col-4'>
                            <h3 className='heading'>Shop Owner Dashboard</h3>
                        </div>
                        <div className='col-8 btn-align'>
                            <button className='btns' onClick={addItems}>ADD BOOK</button>
                            <button className='btns' onClick={viewAddedItems}>VIEW ADEDD BOOKS</button>
                            <button className='btns' onClick={viewAllSlots}>VIEW ALL BOOKINGS</button>
                            <button className='btns' onClick={logOut}>LOGOUT</button>
                        </div>
                    </div>
                </header>
                <section>
                                {addFormShow && <AddBook />}
             {viewAddedItem && <ViewAddedBook />}
     {viewPackBookings && <ViewAllBookings />}
            {/* {cir && <Circulation />} */}
                </section>
            </div>








        </>
    );
}

export default Home;
