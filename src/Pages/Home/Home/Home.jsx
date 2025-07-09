import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';
import Coupon from '../Coupon/Coupon';

const Home = () => {
     useEffect(() => {
        document.title = "Home | Thikana";
      }, []);
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupon></Coupon>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default Home;