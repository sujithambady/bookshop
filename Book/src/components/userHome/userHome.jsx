import React, { useState, useEffect } from 'react';
import './userHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import MyBuyings from '../myBuyings/myBuyings';

Modal.setAppElement('#root');

function UserHome() {
    const userId = localStorage.getItem('userId');
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const [buyings, setBuyings] = useState(false);
    const [viewAll, setViewAll] = useState(true);
    const navigate = useNavigate();

    const logOut = () => {
        if (window.confirm('Are you sure want to logout?')) {
            localStorage.clear();
            navigate('/login');
        }
    };

    const getAddedBooks = async () => {
        try {
            const response = await axios.get(`https://localhost:7239/api/User/allBooks`);
            setPackages(response.data);
            setFilteredPackages(response.data);
            console.log(`Response------>${response.data}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAddedBooks();
    }, []);

    useEffect(() => {
        const results = packages.filter(pack =>
            pack.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPackages(results);
    }, [searchTerm, packages]);

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid.";
        } else if (!/\S+@(gmail\.com|yahoo\.com)$/.test(email)) {
            newErrors.email = "Email must be a valid gmail.com or yahoo.com address.";
        }
        if (!phone) {
            newErrors.phone = "Phone is required.";
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }
        if (!address) {
            newErrors.address = "Address is required.";
        }
        return newErrors;
    };

    const handleBookNow = (name) => {
        setSelectedBookId(name);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        try {
            const response = await axios.post(`https://localhost:7239/api/User/buyBook`, {
                buyerid: userId,
                bookname: selectedBookId,
                buyeremail: email,
                phone: phone,
                address: address
            });
            if (response.status === 200) {
                alert('Your booking is success..!!');
                getAddedBooks();
                setIsModalOpen(false);
                setEmail('');
                setPhone('');
                setAddress('');
            } else {
                alert('Failed to buy book..!!');
            }
        } catch (err) {
            console.log(`Error while buying book..${err}`);
            alert('Failed to buy book..!!');
        }
    };


    const myBuyings = () => {
        console.log('Working..!!');
        setBuyings(true);
        setViewAll(false);
    }

    return (
        <>
            <div>
                <header className='bg'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-4'>
                                <h3 className='heading'>User Dashboard</h3>
                            </div>
                            <div className='col-8 btn-align'>
                                <button className='btns' onClick={myBuyings}>MY BUYINGS</button>
                                <button className='btns' onClick={logOut}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </header>
                {viewAll && <><div className="container mt-4">
                    <div className="row">
                    </div>
                </div><h3 className='packages-heading mb-4'>Books Live Now</h3><div className="conntainer">
                        <div className="row">
                            {filteredPackages.map((pack) => (
                                <div key={pack.bookid} className="col-md-4 mb-4">
                                    <div className="card card1">
                                        <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.name} />
                                        <div className="card-body">
                                            <h3 className="card-title rec_Name main_ttl">{pack.name}</h3>
                                            <p className="card-text expl main_ttl">Author: {pack.author}</p>
                                            <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                                            <p className="card-text expl main_ttl">Price: {pack.price}</p>
                                        </div>
                                        <div className='card-body'>
                                            <button
                                                className="btn book-now-btn mt-2"
                                                onClick={() => handleBookNow(pack.name)}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div><Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="User Details"
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <h2>User Details</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required />
                                {errors.phone && <span className="error">{errors.phone}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required />
                                {errors.address && <span className="error">{errors.address}</span>}
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        </form>
                        <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary mt-2">Cancel</button>
                    </Modal></>}
            </div>

            {buyings && <MyBuyings />}
        </>
    );
}

export default UserHome;
