import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [zone, setZone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then(res => {
        setOrders(res.data.orders || []);
        setZone(res.data.zone || '');
      })
      .catch(() => {
        setOrders([]);
        setZone('');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    await api.delete(`/orders/${id}`);
    setOrders(orders.filter(o => o.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Orders</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', background: '#fff' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Buyer</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyer}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>
                <Link to={`/orders/${order.id}`}>View</Link> |{' '}
                <Link to={`/orders/${order.id}/edit`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/orders/new">Create New Order</Link>
      <div style={{ marginTop: '2rem', color: '#555', fontStyle: 'italic' }}>
        {zone && (
          <span>API used is running in Zone {zone}</span>
        )}
      </div>
    </div>
  );
}

export default OrderList;
