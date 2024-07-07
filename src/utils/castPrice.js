const castPrice = (price = 0) => {
  if (parseInt(price) < 1000) return price;
  let temp = price.toString().split("");
  let length = temp.length;
  while (length > 3) {
    length -= 3;
    temp.splice(length, 0, ".");
  }

  return temp.join("");
};
export default castPrice;
