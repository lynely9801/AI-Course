import { useEffect, useState } from 'react';
import { fetchInventory } from '../services/inventoryService';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', sku: '', quantity: '', price: '', location: '' });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', sku: '', quantity: '', price: '', location: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditForm({
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      location: item.location
    });
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
      const res = await fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          ...editForm,
          quantity: Number(editForm.quantity),
          price: Number(editForm.price)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Cập nhật sản phẩm thất bại');
      setItems(prev => prev.map(i => i.id === id ? data : i));
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

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Xóa sản phẩm thất bại');
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchInventory()
      .then(data => setItems(data))
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
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          price: Number(form.price)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Thêm sản phẩm thất bại');
      setItems(prev => [...prev, data]);
      setForm({ name: '', sku: '', quantity: '', price: '', location: '' });
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div>Đang tải danh sách kho...</div>;
  if (error) return <div style={{color:'red'}}>Lỗi: {error}</div>;

  return (
    <div>
      <h2>Danh sách sản phẩm kho</h2>
      <form onSubmit={handleAdd} style={{marginBottom:24,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" required style={{padding:8}} />
        <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" required style={{padding:8}} />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Số lượng" type="number" min="0" required style={{padding:8}} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Giá" type="number" min="0" required style={{padding:8}} />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Vị trí" required style={{padding:8}} />
        <button type="submit" disabled={adding} style={{padding:8,background:'#222e3c',color:'#fff',border:'none',borderRadius:4}}>
          {adding ? 'Đang thêm...' : 'Thêm sản phẩm'}
        </button>
        {addError && <span style={{color:'red',marginLeft:8}}>{addError}</span>}
      </form>
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:16}}>
        <thead>
          <tr style={{background:'#f0f0f0'}}>
            <th style={{border:'1px solid #ccc',padding:8}}>ID</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Tên</th>
            <th style={{border:'1px solid #ccc',padding:8}}>SKU</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Số lượng</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Giá</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Vị trí</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td style={{border:'1px solid #ccc',padding:8}}>{i.id}</td>
              {editId === i.id ? (
                <>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="name" value={editForm.name} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="sku" value={editForm.sku} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="quantity" type="number" value={editForm.quantity} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="price" type="number" value={editForm.price} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}><input name="location" value={editForm.location} onChange={handleEditChange} style={{padding:4}} /></td>
                  <td style={{border:'1px solid #ccc',padding:8}}>
                    <button onClick={() => handleEditSave(i.id)} disabled={editLoading} style={{background:'#3182ce',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px',marginRight:4}}>
                      {editLoading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button onClick={handleEditCancel} style={{background:'#aaa',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px'}}>Hủy</button>
                    {editError && <div style={{color:'red'}}>{editError}</div>}
                  </td>
                </>
              ) : (
                <>
                  <td style={{border:'1px solid #ccc',padding:8}}>{i.name}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{i.sku}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{i.quantity}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{i.price.toLocaleString()}₫</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>{i.location}</td>
                  <td style={{border:'1px solid #ccc',padding:8}}>
                    <button onClick={() => handleEditClick(i)} style={{background:'#4fd1c5',color:'#222e3c',border:'none',borderRadius:4,padding:'4px 10px',marginRight:4}}>Sửa</button>
                    <button onClick={() => handleDelete(i.id)} style={{background:'#e53e3e',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px',cursor:'pointer'}}>Xóa</button>
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
