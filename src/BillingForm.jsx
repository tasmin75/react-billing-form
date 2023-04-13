import React, { useState } from 'react';
import './App.css'

function BillingForm() {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 0, price: 0 }]);
 const [createBill, setCreateBill] = useState(false);
 const [disable, setDisable] = useState(false);
 const [total, setTotal] = useState(0);

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const billData = { customerName, items };
    console.log(billData); // Replace with code to send data to server or do something else with it
  };
  const handleCreateBill = () => {
    setCreateBill(true);
    setDisable(true);

    let total = 0;
    items.map((item) => {
      total += item.quantity * item.price;
    });
    setTotal(total);

  };

const handleClearItem = () => {
  setCreateBill(false);
  setDisable(false);
  setItems([{ name: '', quantity: 0, price: 0 }]);
  setCustomerName('');
  setTotal(0);
}
  
  


  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Customer Name:
        <input 
        disabled={disable}
        type="text" value={customerName} onChange={handleCustomerNameChange} />
      </label>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input 
                disabled={disable}
                type="text" value={item.name} onChange={(event) => handleItemChange(event, index)} name="name" />
              </td>
              <td>
                <input 
                disabled={disable}
                type="number" value={item.quantity} onChange={(event) => handleItemChange(event, index)} name="quantity" />
              </td>
              <td>
                <input 
                disabled={disable}
                type="number" value={item.price} onChange={(event) => handleItemChange(event, index)} name="price" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
      disabled={disable}
      type="button" onClick={handleAddItem}>Add More Item</button>
      <button type="submit" 
      onClick={handleCreateBill}
      >Create Bill</button>
    </form>

    {/* show totall bill */}
    {createBill &&
    <div>
      <h1>Bill</h1> 
      <h2>Customer Name: {customerName}</h2>
      <table border="1px">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>  

              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity * item.price}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
            <hr />
  
            <h3>Total: {total}</h3>
            <button onClick={handleClearItem}>Clear</button>

    </div>
    }


            

    </>
  );
}

export default BillingForm;
