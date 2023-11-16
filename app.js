const http = require("http");

const products = [
  {
    id: 1,
    name: "Toothpaste",
    price: 4.3,
    quantity: 3,
  },
  {
    id: 2,
    name: "Tooth Brush",
    price: 10,
    quantity: 1,
  },
  {
    id: 3,
    name: "Toilet Paper",
    price: 5,
    quantity: 5,
  },
  {
    id: 4,
    name: "Shampoo",
    price: 4.3,
    quantity: 1,
  },
];

function isId(url) {
  let id = url.split("/", 2);
  id = parseInt(id[1]);
  if (typeof id === "number") {
    return true;
  }

  return false;
}

const server = http.createServer((request, response) => {
  // Home Route
  if (request.url === "/") {
    return response
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(JSON.stringify(products));
  }

  // Total Cost
  if (request.url === "/totalcost") {
    const totalCost = products.reduce(
      (previousValue, currentValue) =>
        (previousValue += currentValue.price * currentValue.quantity),
      0
    );

    return response
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(
        JSON.stringify({
          message: "Total Cost Successfully calculated",
          totalCost: totalCost.toFixed(2),
        })
      );
  }

  // Total Quantity
  if (request.url === "/totalquantity") {
    const totalquantity = products.reduce(
      (previousValue, currentValue) => (previousValue += currentValue.quantity),
      0
    );

    return response
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(
        JSON.stringify({
          message: "Total Quantity Successfully calculated",
          totalQuantity: totalquantity,
        })
      );
  }

  // Finding Product By Id
  if (isId(request.url)) {
    let id = request.url.split("/", 2);
    id = parseInt(id[1]);

    const product = products.find((product) => product.id === id);

    if (!product) {
      return response
        .writeHead(404, {
          "Content-Type": "application/json",
        })
        .end(
          JSON.stringify({
            error: "Resource Not Found",
            message: "Could not find product with that ID",
          })
        );
    }

    return response
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(JSON.stringify(product));
  }

  return response
    .writeHead(404, {
      "Content-Type": "application/json",
    })
    .end(
      JSON.stringify({
        error: "Resource Not Found",
        message: "Page Not Found",
      })
    );
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
