import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, incrementQty, decrementQty } from "../Slice/Cartslice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [useSaved, setUseSaved] = useState(false);

  const [delivery, setDelivery] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser._id) {
        try {
          const response = await fetch(`http://localhost:4000/api/user/getone/${storedUser._id}`);
          const data = await response.json();

          console.log("Database Response:", data); 

          if (
            data &&
            data.address &&
            data.address.address &&
            data.address.city &&
            data.address.pincode
          ) {
            setSavedAddress(data.address);
          }

        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }
    };
    if (showPopup) fetchUserData();
  }, [showPopup]);

  const handleSelectSaved = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (savedAddress) {
      setDelivery({
        name: user.name || "",
        mobile: savedAddress.mobile || "",
        email: user.email || "",
        address: savedAddress.address || "",
        city: savedAddress.city || "",
        pincode: savedAddress.pincode || "",
      });
      setUseSaved(true);
    }
  };

  const handleChange = (e) => {
    setUseSaved(false);
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subTotal;


const handleOrder = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return alert("Please login first");
  if (!delivery.name || !delivery.address || !delivery.mobile) {
    alert("Please fill all details");
    return;
  }

  const options = {
    key: "rzp_test_SJuzfa2teLVFp1", // 🔥 replace with your Razorpay Test Key
    amount: totalAmount * 100, // amount in paise
    currency: "INR",
    name: "My Store",
    description: "Order Payment",

    handler: function (response) {
      alert("Payment Successful ✅");
      console.log("Payment ID:", response.razorpay_payment_id);

      // Redirect to success page
      window.location.href = "/success";
    },

    // prefill: {
    //   name: delivery.name,
    //   email: delivery.email,
    //   contact: delivery.mobile,
    // },

    theme: {
      color: "#0ea5e9",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
  return (
    <div className="cart-container">
      <h2>Cart Items</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th><th>Name</th><th>Price</th><th>Qty</th><th>Total</th><th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr><td colSpan="6">Cart is empty</td></tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item._id}>
                <td><img src={item.image} alt={item.title} className="cart-img" /></td>
                <td>{item.title}</td><td>${item.price}</td>
                <td>
                  <div className="qtybox">
                    <button className="qtybtn" onClick={() => dispatch(decrementQty(item._id))}>-</button>
                    <span className="qtyvalue">{item.quantity}</span>
                    <button className="qtybtn" onClick={() => dispatch(incrementQty(item._id))}>+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td><button className="remove-btn" onClick={() => dispatch(remove(item._id))}>X</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {cartItems.length > 0 && (
        <div className="order-section">
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button className="placeorder-btn" onClick={() => setShowPopup(true)}>Place Order</button>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Delivery Details</h3>


            {savedAddress && (
              <div
                onClick={handleSelectSaved}
                className="saved-address-option">
                <p style={{ color: "#22d3ee", fontWeight: "bold", margin: "0 0 5px 0" }}>Use Saved Address:</p>
                <p style={{ margin: "0", fontSize: "14px", color: "#e5e7eb" }}>
                  {savedAddress.address}, {savedAddress.city} - {savedAddress.pincode}
                </p>
                <p>Ph: {savedAddress.mobile}</p>
              </div>
            )}

            <div className="form-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Full Name" name="name" value={delivery.name} onChange={handleChange} />
              <input type="text" placeholder="Mobile Number" name="mobile" value={delivery.mobile} onChange={handleChange} />
              <input type="email" placeholder="Email" name="email" value={delivery.email} onChange={handleChange} />
              <textarea placeholder="Full Address" name="address" value={delivery.address} onChange={handleChange} />
              <input type="text" placeholder="City" name="city" value={delivery.city} onChange={handleChange} />
              <input type="text" placeholder="Pincode" name="pincode" value={delivery.pincode} onChange={handleChange} />
            </div>

            <div className="pop">
              <button className="conform" onClick={handleOrder}>Confirm Order</button>
              <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;