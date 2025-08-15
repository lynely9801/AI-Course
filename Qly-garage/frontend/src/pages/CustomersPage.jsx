import { useEffect, useState } from 'react';
import { fetchCustomers } from '../services/customerService';

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const handleEditClick = (c) => {
    setEditId(c.id);
    setEditForm({ name: c.name, phone: c.phone, email: c.email, address: c.address });
    setEditError('');
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    setEditLoading(true);
    setEditError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Cập nhật khách hàng thất bại');
      setCustomers(prev => prev.map(c => c.id === id ? data : c));
      setEditId(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditError('');
  };

  useEffect(() => {
    fetchCustomers()
      .then(data => setCustomers(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    setAdding(true);
    setAddError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Thêm khách hàng thất bại');
      setCustomers(prev => [...prev, data]);
      setForm({ name: '', phone: '', email: '', address: '' });
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div>Đang tải danh sách khách hàng...</div>;
  if (error) return <div style={{color:'red'}}>Lỗi: {error}</div>;

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa khách hàng này?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Xóa khách hàng thất bại');
      setCustomers(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Danh sách khách hàng</h2>
      <form onSubmit={handleAdd} style={{marginBottom:24,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên khách hàng" required style={{padding:8}} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Điện thoại" required style={{padding:8}} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{padding:8}} />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" required style={{padding:8}} />
        <button type="submit" disabled={adding} style={{padding:8,background:'#222e3c',color:'#fff',border:'none',borderRadius:4}}>
          {adding ? 'Đang thêm...' : 'Thêm khách hàng'}
        </button>
        {addError && <span style={{color:'red',marginLeft:8}}>{addError}</span>}
      </form>
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:16}}>
        <thead>
          <tr style={{background:'#f0f0f0'}}>
            <th style={{border:'1px solid #ccc',padding:8}}>ID</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Tên</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Điện thoại</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Email</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Địa chỉ</th>
            <th style={{border:'1px solid #ccc',padding:8}}></th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td style={{border:'1px solid #ccc',padding:8}}>{c.id}</td>
              {editId === c.id ? (
                <>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="name" value={editForm.name} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="phone" value={editForm.phone} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="email" value={editForm.email} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="address" value={editForm.address} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}>
                    <button onClick={() => handleEditSave(c.id)} disabled={editLoading} style={{background:'#3182ce',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px',marginRight:4}}>
                      {editLoading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button onClick={handleEditCancel} style={{background:'#aaa',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px'}}>Hủy</button>
                    {editError && <div style={{color:'red'}}>{editError}</div>}
                  </td>
                </>
              ) : (
                <>
                  <td style={{border:'1px solid #ccc',padding:8}}>{c.name}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{c.phone}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{c.email}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{c.address}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>
                    <button onClick={() => handleEditClick(c)} style={{background:'#4fd1c5',color:'#222e3c',border:'none',borderRadius:4,padding:'4px 10px',marginRight:4}}>Sửa</button>
                    <button onClick={() => handleDelete(c.id)} style={{background:'#e53e3e',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px',cursor:'pointer'}}>Xóa</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
