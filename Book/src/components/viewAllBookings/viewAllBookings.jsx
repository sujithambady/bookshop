import axios from "axios";
import React, { useEffect, useState } from "react";
import './viewAllBookings.css';

function ViewAllBookings() {
  const [allSales, setAllSales] = useState([]);

  const getAllSales = async () => {
    try {
      const response = await axios.get('https://localhost:7239/api/User/allSales');
      setAllSales(response.data);
      console.log(`Response------>${response.data}`);
    } catch (err) {
      console.log(`Error while fetching data..${err}`);
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <>
      <div className="table-container">
            <h3 style={{color: '#f2c531', fontWeight: 'bold'}}>All Sales</h3>
            <table className="styled-table">
          <thead>
            <tr>
              <th>Sale Id</th>
              <th>Book Name</th>
              <th>Buyer Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {allSales.map((sale) => (
              <tr key={sale.saleId}>
                <td>{sale.saleId}</td>
                <td>{sale.bookname}</td>
                <td>{sale.buyeremail}</td>
                <td>{sale.phone}</td>
                <td>{sale.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewAllBookings;
