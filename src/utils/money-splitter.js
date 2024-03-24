export default (amount) => {
    const value = String(amount);
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  