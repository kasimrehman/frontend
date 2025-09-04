import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

function OrderForm({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    buyer: '',
    product_name: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && id) {
      setLoading(true);
      api.get(`/orders/${id}`)
        .then(res => setForm(res.data))
        .finally(() => setLoading(false));
    }
  }, [editMode, id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await api.put(`/orders/${id}`, form);
      } else {
        await api.post('/orders', form);
      }
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{editMode ? 'Edit Order' : 'Create Order'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Buyer: <input name="buyer" value={form.buyer} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Product Name: <input name="product_name" value={form.product_name} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Quantity: <input name="quantity" type="number" value={form.quantity} onChange={handleChange} min="1" required /></label>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}

export default OrderForm;
