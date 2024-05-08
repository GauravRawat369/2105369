import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    let intervalId;
    if (accessToken) {
      const expiresInMs = 1000 * 60 * 60; // assuming expiresIn is in seconds, change it accordingly
      intervalId = setInterval(fetchToken, expiresInMs); // Fetch token after expiresInMs
    }
    return () => clearInterval(intervalId);
  }, [accessToken]);

  const fetchToken = () => {
    const data = {     //these can be added to env variable 
      companyName: 'GuaravMart',
      clientID: '185ce8fa-f7d5-404e-b835-821a22ab2477',
      clientSecret: 'MtbfwZHpjCSouucG',
      ownerName: 'Gaurav',
      ownerEmail: '2105369@kiit.ac.in',
      rollNo: '2105369',
    };

    axios.post('http://20.244.56.144/test/auth', data)
      .then(response => {
        const { access_token, expires_in } = response.data;
        setAccessToken(access_token);
        const expiresInMs = expires_in * 1000; 
        setTimeout(fetchToken, expiresInMs); 
      })
      .catch(error => {
        console.error('Error fetching token:', error);
      });
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const companies = ['AMZ', 'FLP', 'SNP','MYN','AZO']; 
      const categories = ['Phone', 'Computer','TV','Earphone','Tablet','Charger','Mouse','Keypad','Bluetooth','Pendrive','Remote','Speaker','Headset','Laptop','Pc']; 
      //as there is no common route to fetch all products then we will have to modify the route and store js response 
      const allProducts = [];
      const headers = {
        'Authorization': 'Bearer ' + accessToken
      };

      for (const company of companies) {
        for (const category of categories) {
          try {
            const response = await axios.get(
              `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`,
              { headers } // Include headers in the request
            );
            allProducts.push(...response.data);
          } catch (error) {
            console.error(`Error fetching products for company ${company} and category ${category}:`, error);
          }
        }
      }
      return allProducts;
    };

    getAllProducts()
      .then(products => {
        console.log('All products:', products);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [accessToken]);

  return (
    <div className="App">
      <div className="content-div">
        <div className="product">
          {/* <img src="" className="product-img"/>
          <h1 className="product-title"></h1>
          <h4 className="product-category"></h4>
          <div className="product-price-cart">
            <h3 className="product-price"></h3>
            <a href="" className="product-cart"></a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
