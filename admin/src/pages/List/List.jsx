import React, { useEffect, useState } from 'react';
import './List.css'; // Import the refactored CSS
import axios from 'axios';
import { toast } from 'react-toastify';

const FoodList = ({ url }) => { // More descriptive component name
  const [foodList, setFoodList] = useState([]); // Use a more specific name

  const fetchData = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error('Error fetching food list');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchData(); // Update list after removal
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error removing food');
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <div className="list-container flex-col">  {/* More descriptive class */}
      <p>All Foods List</p>
      <div className="data-grid">  {/* Use the refactored class name */}
        <div className="data-grid header"> {/* Use the refactored class name */}
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {foodList.map((item, index) => (
          <div key={index} className="data-grid"> {/* Use the refactored class name */}
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
