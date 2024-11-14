import React, { useEffect, useState } from 'react';
import '../../styles/NewProducts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productCarouselImg1, setProductCarouselImg1] = useState('');
  const [productCarouselImg2, setProductCarouselImg2] = useState('');
  const [productCarouselImg3, setProductCarouselImg3] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [productGender, setProductGender] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [AvailableCategories, setAvailableCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-categories');
      setAvailableCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setProductSizes([...productSizes, value]);
    } else {
      setProductSizes(productSizes.filter((size) => size !== value));
    }
  };

  const handleNewProduct = async () => {
    try {
      const newProductData = {
        productName,
        productDescription,
        productMainImg,
        productCarousel: [productCarouselImg1, productCarouselImg2, productCarouselImg3],
        productSizes,
        productGender,
        productCategory,
        productNewCategory,
        productPrice,
        productDiscount,
      };

      await axios.post('http://localhost:6001/add-new-product', newProductData);
      alert('Product added successfully!');

      // Reset form fields
      setProductName('');
      setProductDescription('');
      setProductMainImg('');
      setProductCarouselImg1('');
      setProductCarouselImg2('');
      setProductCarouselImg3('');
      setProductSizes([]);
      setProductGender('');
      setProductCategory('');
      setProductNewCategory('');
      setProductPrice(0);
      setProductDiscount(0);

      navigate('/all-products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please check the console for details.');
    }
  };

  return (
    <div className="new-product-page">
      <div className="new-product-container">
        <h3>New Product</h3>

        <div className="new-product-body">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewProduct1"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label htmlFor="floatingNewProduct1">Product name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewProduct2"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <label htmlFor="floatingNewProduct2">Product Description</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewProduct1"
              value={productMainImg}
              onChange={(e) => setProductMainImg(e.target.value)}
            />
            <label htmlFor="floatingNewProduct1">Thumbnail Img url</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewProduct2"
              value={productCarouselImg1}
              onChange={(e) => setProductCarouselImg1(e.target.value)}
            />
            <label htmlFor="floatingNewProduct2">Add on img1 url</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewProduct2"
              value={productCarouselImg2}
              onChange={(e) => setProductCarouselImg2(e.target.value)}
            />
            <label htmlFor="floatingNewProduct2">Add on img2 url</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingNewProduct2"
              value={productCarouselImg3}
              onChange={(e) => setProductCarouselImg3(e.target.value)}
            />
            <label htmlFor="floatingNewProduct2">Add on img3 url</label>
          </div>

          <section>
            <h4>Available Size</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="S"
                checked={productSizes.includes('S')}
                onChange={handleCheckBox}
              />
              <label className="form-check-label">S</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="M"
                checked={productSizes.includes('M')}
                onChange={handleCheckBox}
              />
              <label className="form-check-label">M</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="L"
                checked={productSizes.includes('L')}
                onChange={handleCheckBox}
              />
              <label className="form-check-label">L</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="XL"
                checked={productSizes.includes('XL')}
                onChange={handleCheckBox}
              />
              <label className="form-check-label">XL</label>
            </div>
          </section>

          <section>
            <h4>Gender</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productGender"
                value="Men"
                checked={productGender === 'Men'}
                onChange={(e) => setProductGender(e.target.value)}
              />
              <label className="form-check-label">Men</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productGender"
                value="Women"
                checked={productGender === 'Women'}
                onChange={(e) => setProductGender(e.target.value)}
              />
              <label className="form-check-label">Women</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productGender"
                value="Unisex"
                checked={productGender === 'Unisex'}
                onChange={(e) => setProductGender(e.target.value)}
              />
              <label className="form-check-label">Unisex</label>
            </div>
          </section>

          <section>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                value={productCategory}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setProductCategory(selectedCategory);
                  if (selectedCategory !== 'new category') {
                    setProductNewCategory('');
                  }
                }}
              >
                <option value="">Choose Product category</option>
                {AvailableCategories && AvailableCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
                <option value="new category">New category</option>
              </select>
              <label>Category</label>
            </div>

            {productCategory === 'new category' && (
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={productNewCategory}
                  onChange={(e) => setProductNewCategory(e.target.value)}
                />
                <label>New Category</label>
              </div>
            )}

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <label>Product Price</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                value={productDiscount}
                onChange={(e) => setProductDiscount(e.target.value)}
              />
              <label>Product Discount (%)</label>
            </div>
          </section>

          <button className="new-product-submit-btn" onClick={handleNewProduct}>Add New Product</button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;