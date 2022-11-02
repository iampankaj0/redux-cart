import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cardsdata from "./CardsData";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/actions";

const Cards = () => {
  const [cardData, setCardData] = useState(Cardsdata);

  const dispatch = useDispatch();

  const addCart = (e) => {
    dispatch(ADD(e))
  };

  return (
    <div className="container my-3">
      <h2 className="text-center mb-3">All Products</h2>
      <div className="row gy-3">
        {cardData.map((item, id) => {
          return (
            <div className="col-lg-4 col-md-6 col-12" key={id}>
              <Card style={{ borderRadius: "5px" }}>
                <Card.Img
                  variant="top"
                  src={item.imgdata}
                  style={{ height: "16rem" }}
                />
                <Card.Body>
                  <Card.Title> {item.rname} </Card.Title>
                  <Card.Text>Price: ₹ {item.price}</Card.Text>
                  <div className="btn_addCart">
                    <Button
                      onClick={() => addCart(item)}
                      variant="primary"
                      className="w-100"
                    >
                      <ShoppingCartIcon /> Add To Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
