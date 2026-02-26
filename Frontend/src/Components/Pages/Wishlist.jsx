import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../Slice/WishlistSlice";
import { add } from "../Slice/Cartslice";


const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h2 className="cart-title">Wishlist Items</h2>

      {wishlistItems.length === 0 ? (
        <h3 className="empty-msg">Your wishlist is empty</h3>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Add To Cart</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-img"
                  />
                </td>

                <td>{item.title}</td>

                <td>${item.price}</td>

                <td>
                  <button
                    className="btn-add"
                    onClick={() => dispatch(add(item))}
                  >
                    Add to Cart
                  </button>
                </td>

                <td>
                  <button
                    className="btn-remove"
                    onClick={() =>
                      dispatch(removeFromWishlist(item._id))
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Wishlist;
