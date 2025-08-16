import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';
import Coupon from '../Coupon/Coupon';
import FAQ from '../../../components/FAQ';
import WhatsComing from '../../../components/WhatsComing';
import HowItWorks from '../../../components/HowItWorks';
import StatsSection from '../../../components/StatsSection';



const Home = () => {
     useEffect(() => {
        document.title = "Home | Thikana";
      }, []);
    return (
        <div>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupon></Coupon>
           <StatsSection></StatsSection>
            <WhatsComing></WhatsComing>
            <ApartmentLocation></ApartmentLocation>
            <FAQ></FAQ>
            <HowItWorks></HowItWorks>
            
        </div>
    );
};

export default Home;