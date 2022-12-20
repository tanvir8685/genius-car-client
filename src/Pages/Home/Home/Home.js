import React from 'react';
import TestPage from '../../TestPage/TestPage';
import About from '../About/About';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <About></About>
          <Services></Services>
          <TestPage></TestPage>
        </div>
    );
};

export default Home;