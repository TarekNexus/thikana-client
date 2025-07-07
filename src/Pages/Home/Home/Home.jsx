import React from 'react';
import Banner from '../Banner/Banner';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default Home;