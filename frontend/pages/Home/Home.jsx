import React, { useState } from 'react';
import './HomePage.css'; // Renamed CSS file for variety
import MainHeader from '../../src/components/MainHeader/MainHeader'; // Renamed component and path
import CategorySelector from '../../src/components/CategorySelector/CategorySelector'; // Renamed component and path
import DishGallery from '../../src/components/DishGallery/DishGallery'; // Renamed component and path
import AppPromotion from '../../src/components/AppPromotion/AppPromotion'; // Renamed component and path

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <div>
            <MainHeader />
            <CategorySelector currentCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            <DishGallery category={selectedCategory} />
            <AppPromotion />
        </div>
    );
};

export default HomePage;
