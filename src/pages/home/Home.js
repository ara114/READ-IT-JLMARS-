// import { Button } from '../../components/button/Button'
import React from 'react';
import Navbar from '../../components/navbar/NavBar';
import './Home.css';
import Recommended from '../../components/Recommended/Recommended';
import Categories from '../../components/Categories/Categories';
import Write from '../../components/Write/Write';
import Footer from '../../components/Footer/Footer';

function Home({ handleLogout }) {
	return (
        <div className="home">
            <div className="home-container max-width">
                <Navbar /> 
                <div className="content">
                    <Recommended />
                    <Categories/>
                    <Write />
                </div>
            </div>
            <Footer />
        </div>
	)
}

export default Home
