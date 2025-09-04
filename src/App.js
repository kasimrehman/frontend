import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderList from './pages/OrderList';
import OrderDetails from './pages/OrderDetails';
import OrderForm from './pages/OrderForm';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/orders">Orders</Link> | <Link to="/orders/new">Create Order</Link>
      </nav>
      <Routes>
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/new" element={<OrderForm />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders/:id/edit" element={<OrderForm editMode={true} />} />
        <Route path="*" element={<OrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
