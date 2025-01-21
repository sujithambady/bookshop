import React, { useState, useEffect } from "react";
import axios from 'axios';
import './myBuyings.css';

function MyBuyings() {
    const [packages, setPackages] = useState([]);
    const [feedbacks, setFeedbacks] = useState({});
    const [visibleFeedback, setVisibleFeedback] = useState(null);

    useEffect(() => {
        const getAddedBooks = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://localhost:7239/api/User/myBuyings/${userId}`);
                setPackages(response.data);
                console.log(`Response------>${packages}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAddedBooks();
    }, []);

    return (
        <>
            <div className="containner">
                <div className="row">
                <h3 className="main_ttl mt-4" style={{textAlign: 'center',fontWeight:'bold'}}>My Collection</h3>
                    {packages.map((pack) => (
                        <div key={pack.packageid} className="col-md-3 mb-4 mt-4">
                            <div className="card card1">
                                <div className="card-body">
                                    <h4 className="card-title rec_Name main_ttl">{pack.name}</h4>
                                    <p className="card-text expl main_ttl">Book Name: {pack.bookname}</p>
                                    <p className="card-text expl main_ttl">Buyer Email: {pack.buyeremail}</p>
                                    <p className="card-text expl main_ttl">Phone: {pack.phone}</p>
                                    <p className="card-text expl main_ttl">Address: {pack.address}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyBuyings;
