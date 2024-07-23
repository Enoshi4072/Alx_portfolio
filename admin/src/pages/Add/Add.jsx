import React, { useState } from 'react';
import './Add.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Add = ({ url = 'http://localhost:4000' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'salad',
    image: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description, price, category, image } = formData;

    const newPrice = Number(price); // Ensure price is a number

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'salad',
          image: null,
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={handleChange}
            type="file"
            id="image"
            hidden
            required
            name="image"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={handleChange}
            value={formData.description}
            name="description"
            rows="10"
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={handleChange} name="category" value={formData.category}>
              <option value="salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={handleChange}
              value={formData.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
