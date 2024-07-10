const calculatePrice = (title, year, genre) => {
    const minPrice = 100;
    const maxPrice = 1000;
  
    // Simple hash function to generate a pseudo-random price
    const hash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };
  
    const combinedString = `${title}${year}${genre}`;
    const rawPrice = hash(combinedString);
  
    // Normalize the price to be between minPrice and maxPrice
    const price = minPrice + Math.abs(rawPrice) % (maxPrice - minPrice);
  
    return price;
  };
  
  export default calculatePrice;
  