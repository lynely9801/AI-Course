import { useEffect, useState } from 'react';
import { fetchOrders, createOrder, deleteOrder, updateOrder } from '../services/orderService';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ customerId: '', items: '', total: '', status: 'pending' });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ customerId: '', items: '', total: '', status: 'pending' });
  const handleEdit = (o) => {
    setEditId(o.id);
    setEditForm({
      customerId: o.customerId,
      items: o.items.map(i => `${i.inventoryId}:${i.quantity}:${i.price}`).join(','),
      total: o.total,
      status: o.status
    });
    setError('');
    setSuccess('');
  };

  const handleEditChange = e => {
    setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEditSave = async (id) => {
    setError('');
    setSuccess('');
    try {
      const items = editForm.items.split(',').map(s => {
        const [inventoryId, quantity, price] = s.split(':');
        return { inventoryId, quantity: Number(quantity), price: Number(price) };
      });
      await updateOrder(id, {
        customerId: editForm.customerId,
        items,
        total: Number(editForm.total),
        status: editForm.status
      });
      setSuccess('Đã cập nhật đơn hàng!');
      setEditId(null);
      loadOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    fetchOrders()
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };
  }, []);
  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreating(true);
    try {
      const items = form.items.split(',').map(s => {
        const [inventoryId, quantity, price] = s.split(':');
        return { inventoryId, quantity: Number(quantity), price: Number(price) };
      });
      await createOrder({
        customerId: form.customerId,
        items,
        total: Number(form.total),
        status: form.status
      });
      setSuccess('Tạo đơn hàng thành công!');
      setForm({ customerId: '', items: '', total: '', status: 'pending' });
      loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteOrder(id);
      setSuccess('Đã xóa đơn hàng!');
      loadOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Đang tải danh sách đơn hàng...</div>;
  if (error) return <div style={{color:'red'}}>Lỗi: {error}</div>;

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <form onSubmit={handleSubmit} style={{marginBottom:16, border:'1px solid #ccc', padding:12, display:'inline-block'}}>
        <b>Thêm đơn hàng mới</b><br/>
        <input name="customerId" placeholder="ID khách hàng" value={form.customerId} onChange={handleChange} required />{' '}
        <input name="items" placeholder="SP:SL:Giá,SP2:SL2:Giá2" value={form.items} onChange={handleChange} required style={{width:220}} />{' '}
        <input name="total" placeholder="Tổng tiền" value={form.total} onChange={handleChange} required type="number" />{' '}
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
        </select>{' '}
        <button type="submit" disabled={creating}>Tạo đơn hàng</button>
      </form>
      {success && <div style={{color:'green'}}>{success}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:16}}>
        <thead>
          <tr style={{background:'#f0f0f0'}}>
            <th style={{border:'1px solid #ccc',padding:8}}>ID</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Khách hàng</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Sản phẩm</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Tổng tiền</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Trạng thái</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Ngày tạo</th>
            <th style={{border:'1px solid #ccc',padding:8}}></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td style={{border:'1px solid #ccc',padding:8}}>{o.id}</td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === o.id ? (
                  <input name="customerId" value={editForm.customerId} onChange={handleEditChange} />
                ) : o.customerId}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === o.id ? (
                  <input name="items" value={editForm.items} onChange={handleEditChange} style={{width:180}} />
                ) : o.items.map((item, idx) => (
                  <div key={idx}>{item.inventoryId} x {item.quantity} ({item.price.toLocaleString()}₫)</div>
                ))}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === o.id ? (
                  <input name="total" value={editForm.total} onChange={handleEditChange} type="number" />
                ) : o.total?.toLocaleString() + '₫'}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === o.id ? (
                  <select name="status" value={editForm.status} onChange={handleEditChange}>
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                ) : o.status}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>{new Date(o.createdAt).toLocaleString()}</td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === o.id ? (
                  <>
                    <button onClick={() => handleEditSave(o.id)} style={{color:'green'}}>Lưu</button>{' '}
                    <button onClick={handleEditCancel}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(o)} style={{color:'blue'}}>Sửa</button>{' '}
                    <button onClick={() => handleDelete(o.id)} style={{color:'red'}}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
