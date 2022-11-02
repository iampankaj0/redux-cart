import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link, NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CartNoItemImg from "../images/cart.gif";
import "./css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveItem } from "../redux/actions/actions";

const Header = () => {
  const getCartData = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();

  const [openCart, setOpenCart] = useState(false);
  const [myPrice, setMyPrice] = useState("");

  const handleCartShow = () => {
    setOpenCart((prevState) => !prevState);
  };

  const deleteItemFromCart = (id) => {
    dispatch(RemoveItem(id));
  };

  const totalPrice = () => {
    let price = 0;
    getCartData.map((item, id) => {
      return (price += item.price * item.qnty);
    });

    setMyPrice(price);
  };

  useEffect(() => {
    totalPrice();
  }, [totalPrice]);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="mainNavbar sticky-top"
        style={{ height: "60px" }}
      >
        <Container>
          <NavLink to="/" className="me-2 text-decoration-none text-light">
            Old Rao Hotel
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="me-2 text-decoration-none text-light">
              Home
            </NavLink>
            {/* <Nav.Link href="#3">Break Fast</Nav.Link>
            <Nav.Link href="#4">Lunch</Nav.Link>
            <Nav.Link href="#5">Dinner</Nav.Link>
            <Nav.Link href="#6">Pricing</Nav.Link>
            <Nav.Link href="#7">About</Nav.Link>
            <Nav.Link href="#8">Contact</Nav.Link> */}
          </Nav>
          <Nav.Link
            onClick={handleCartShow}
            className="text-decoration-none text-light"
          >
            <Badge badgeContent={getCartData.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Nav.Link>
        </Container>
        <div className={`openCart ${openCart ? "cartWidthClass" : ""}`}>
          <p className="closeBtn" onClick={handleCartShow}>
            <CloseIcon />
          </p>
          {getCartData.length > 0 ? (
            <div className="item-in-cart">
              <Table>
                <tr>
                  <th>Image</th>
                  <th>Restaurant Name</th>
                  <th>#</th>
                </tr>
                {getCartData.map((item, id) => {
                  return (
                    <tr className="tableDataCart" key={id}>
                      <Link to={`/cart/${item.id}`} onClick={handleCartShow}>
                        <td>
                          <img src={item.imgdata} alt="cartImg" />
                        </td>
                      </Link>
                      <td>
                        <span style={{ fontWeight: "700" }}>{item.rname}</span>
                        <span>Price: ₹ {item.price * item.qnty}</span>
                        <span>Quantity: {item.qnty}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteItemFromCart(item.id)}
                          className="text-danger removeCartBtn"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </Table>
              <div
                className={`totalPriceCost ${openCart ? "cartWidthClass" : ""}`}
              >
                Total : <strong className="me-5"> ₹ {myPrice} </strong>
              </div>
            </div>
          ) : (
            <div className="myCart">
              <div className="noItem-Img">
                <img src={CartNoItemImg} alt="cart img no item" />
              </div>
              <p className="empCart text-center">Your cart is empty!</p>
            </div>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default Header;
