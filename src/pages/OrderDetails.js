import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Order Details</h2>
      <p><b>ID:</b> {order.id}</p>
      <p><b>Buyer:</b> {order.buyer}</p>
      <p><b>Product Name:</b> {order.product_name}</p>
      <p><b>Quantity:</b> {order.quantity}</p>
      <p><b>Date:</b> {order.date}</p>
      <p><b>Time:</b> {order.time}</p>
      <Link to={`/orders/${order.id}/edit`}>Edit</Link> |{' '}
      <button onClick={() => navigate('/orders')}>Back to List</button>
    </div>
  );
}

export default OrderDetails;
