import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import HomeBanner from '../images/home-banner-2.png';  // Default banner image import
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [bannerImg, setBannerImg] = useState(''); // State to store the fetched banner image URL
  const [categories, setCategories] = useState([
    { name: 'Fashion', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQjXpWVVQhkT_A2n03XMo2KDV4yPSLBcoNA&usqp=CAU' },
    { name: 'Electronics', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/1/SE/QC/NG/63182719/product-jpeg-500x500.jpg' },
    { name: 'Mobiles', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw&usqp=CAU' },
    { name: 'Groceries', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ&usqp=CAU' },
    { name: 'Sports Equipments', image: 'https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/' }
  ]);

  useEffect(() => {
    fetchBanner(); // Fetch the banner from the backend when the component mounts
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-banner');
      
      // Assuming the backend returns { banner: "image_url" }
      if (response.data && response.data.banner) {
        setBannerImg(response.data.banner);
      } else {
        console.warn("Banner image not found in response.");
      }
    } catch (error) {
      console.error("Error fetching banner image:", error);
    }
  };

  return (
    <div className="HomePage">
      {/* Home Banner */}
      <div className="home-banner">
        {bannerImg ? (
          <img src={bannerImg} alt="Banner" />
        ) : (
          <img src={HomeBanner} alt="Default Banner" /> // Show default if no banner fetched
        )}
      </div>

      {/* Categories Section */}
      <div className="home-categories-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="home-category-card"
            onClick={() => navigate(`/category/${category.name}`)}
          >
            <img src={category.image} alt={category.name} />
            <h5>{category.name}</h5>
          </div>
        ))}
      </div>

      {/* Products Component */}
      <Products category="all" />
      <Footer />
    </div>
  );
};

export default Home;
