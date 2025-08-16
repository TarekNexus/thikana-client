import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';
import Coupon from '../Coupon/Coupon';
import FAQ from '../../../components/FAQ';
import WhatsComing from '../../../components/WhatsComing';


const Home = () => {
     useEffect(() => {
        document.title = "Home | Thikana";
      }, []);
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupon></Coupon>
            <WhatsComing></WhatsComing>
            <ApartmentLocation></ApartmentLocation>
            <FAQ></FAQ>
            
        </div>
    );
};

export default Home;