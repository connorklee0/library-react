import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import { books } from "./data";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    quantity > 0
      ? setCart(
          [...cart].map((item) =>
            +item.id === +book.id ? { ...item, quantity: +quantity } : item
          )
        )
      : removeBook(book);
  }

  function removeBook(book) {
    setCart([...cart].filter((item) => +item.id !== +book.id));
  }

  function numberOfItems() {
    return (
      cart.length &&
      cart.reduce((total, item) => {
        return (total += item.quantity);
      }, 0)
    );
  }

  useEffect(() => {}, [cart]);

  const totalItems = numberOfItems();

  return (
    <Router>
      <div className="App">
        <Nav totalItems={totalItems} />
        <Routes>
          <Route path="/library" exact element={<Home />} />
          <Route path="/books" exact element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} cart={cart} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                books={books}
                cart={cart}
                changeQuantity={changeQuantity}
                removeBook={removeBook}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
