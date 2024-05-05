import React, { useState, useEffect } from 'react';


const Exchange = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is cached in localStorage
        const cachedData = localStorage.getItem('cryptoData');
        const lastFetchedTime = localStorage.getItem('lastFetchedTime');

        if (cachedData && lastFetchedTime) {
          const currentTime = new Date().getTime();
          const timeSinceLastFetch = currentTime - parseInt(lastFetchedTime);

          // Fetch data only if it's been more than a minute
          if (timeSinceLastFetch < 60000) {
            setCryptoData(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20tether%2C%20binancecoin%2C%20ripple%2C%20solana%2C%20usd-coin%20staked-ether%2C%20cardano%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
        );
        const data = await response.json();

        // Cache the data and current time
        localStorage.setItem('cryptoData', JSON.stringify(data));
        localStorage.setItem(
          'lastFetchedTime',
          new Date().getTime().toString()
        );

        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  


  return (
  <></>
  );
};

export default Exchange;