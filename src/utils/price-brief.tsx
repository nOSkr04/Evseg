const priceBrief = (price: number) => {
   const convert = price.toLocaleString();
    return convert + " ₮";
  };
  
  export { priceBrief };
  