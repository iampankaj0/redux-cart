import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./css/carddetail.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, DescreseSingleItem, RemoveItem } from "../redux/actions/actions";

const CardDetails = () => {
  const history = useNavigate();
  const { id } = useParams();
  const getCartData = useSelector((state) => state.cartReducer.carts);
  const [data, setData] = useState([]);

  const getDataByID = () => {
    const filteredData = getCartData.filter((item) => {
      return item.id == id;
    });
    setData(filteredData);
  };

  useEffect(() => {
    getDataByID();
  }, [id]);

  const dispatch = useDispatch();
  const deleteItemFromCart = (id) => {
    dispatch(RemoveItem(id));
    history("/redux-cart/");
  };

  const addCart = (e) => {
    dispatch(ADD(e));
  };

  // remove signle item from cart (decrement)
  const removeSingleItemCart = (item) => {
    dispatch(DescreseSingleItem(item));
  };

  return (
    <div className="container card_detailsPage mt-3">
      <h2 className="text-center mb-3">Item Details</h2>
      <section className="my-3">
        {data.map((item, id) => {
          return (
            <div className="itemDetails" key={id}>
              <div className="item_img">
                <img src={item.imgdata} alt="item_img" />
              </div>
              <div className="details">
                <Table>
                  <tr>
                    <td>
                      <p>
                        <strong>Restaurant :</strong> {item.rname}
                      </p>
                      <p>
                        <strong>Price :</strong> ₹ {item.price}
                      </p>
                      <p>
                        <strong>Dished :</strong> {item.address}
                      </p>
                      <p>
                        <strong>Total :</strong> ₹ {item.price * item.qnty}
                      </p>
                      <div
                        className="my-2 ms-2 d-flex align-items-center justify-content-between"
                        style={{
                          width: "100px",
                          cursor: "pointer",
                          backgroundColor: "#ddd",
                          color: "",
                        }}
                      >
                        <span
                          style={{ fontSize: "24px" }}
                          onClick={
                            item.qnty === 1
                              ? () => deleteItemFromCart(item.id)
                              : () => removeSingleItemCart(item)
                          }
                        >
                          -
                        </span>
                        <span style={{ fontSize: "22px" }}> {item.qnty} </span>
                        <span
                          style={{ fontSize: "24px" }}
                          onClick={() => addCart(item)}
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td>
                      <p>
                        <strong>Rating :</strong>{" "}
                        <span
                          style={{
                            background: "green",
                            color: "#fff",
                            padding: "2px 5px",
                            borderRadius: "3px",
                          }}
                        >
                          {item.rating} ★
                        </span>
                      </p>
                      <p>
                        <strong>Order Review :</strong> {item.somedata}
                      </p>
                      <p onClick={() => deleteItemFromCart(item.id)}>
                        <strong>Remove :</strong>
                        <DeleteIcon
                          style={{
                            color: "red",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        />
                      </p>
                    </td>
                  </tr>
                </Table>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CardDetails;
