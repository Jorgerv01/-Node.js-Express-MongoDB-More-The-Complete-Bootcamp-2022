module.exports = (temp, product) => {
  const {
    id,
    productName,
    image,
    from,
    nutrients,
    quantity,
    price,
    organic,
    description,
  } = product;
  let output = temp.replace(/{%PRODUCTNAME%}/g, productName);
  output = output.replace(/{%IMAGE%}/g, image);
  output = output.replace(/{%QUANTITY%}/g, quantity);
  output = output.replace(/{%PRICE%}/g, price);
  output = output.replace(/{%FROM%}/g, from);
  output = output.replace(/{%NUTRIENTS%}/g, nutrients);
  output = output.replace(/{%ID%}/g, id);
  output = output.replace(/{%DESCRIPTION%}/g, description);
  {
    !organic && (output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic"));
  }
  return output;
};


