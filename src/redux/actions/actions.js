// ADD ITEM IN CART
export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

// REMOVE ITEM FROM CART
export const RemoveItem = (id) => {
  return {
    type: "REMOVE_CART_ITEM",
    payload: id,
  };
};

// DESCREASE SINGLE ITEM FROM CART
export const DescreseSingleItem = (item) => {
  return {
    type: "DECREASE_CART_ITEM",
    payload: item,
  };
};
