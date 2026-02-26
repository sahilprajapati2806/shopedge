// import React, { useEffect, useState } from "react";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/order/all")
//       .then(res => res.json())
//       .then(data => setOrders(data));
//   }, []);

//   return (
//     <div className="admin-orders">
//       <h2>All Orders</h2>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Mobile</th>
//             <th>City</th>
//             <th>Total</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map(order => (
//             <tr key={order._id}>
//               <td>{order.name}</td>
//               <td>{order.mobile}</td>
//               <td>{order.city}</td>
//               <td>₹{order.totalAmount}</td>
//               <td>{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminOrders; 
import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/order/all")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div key={order._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
          <p><b>User:</b> {order.userId?.email}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Address:</b> {order.customer?.address}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
