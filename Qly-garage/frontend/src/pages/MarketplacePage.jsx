import { useEffect, useState } from 'react';
import { fetchMarketplace, createMarketplace, updateMarketplace, deleteMarketplace } from '../services/marketplaceService';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', sku: '', price: '', brand: '', stock: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', sku: '', price: '', brand: '', stock: '', description: '' });

  const loadItems = () => {
    setLoading(true);
    fetchMarketplace()
      .then(data => setItems(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItems();
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
      await createMarketplace({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });
      setSuccess('Tạo sản phẩm thành công!');
      setForm({ name: '', sku: '', price: '', brand: '', stock: '', description: '' });
      loadItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteMarketplace(id);
      setSuccess('Đã xóa sản phẩm!');
      loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (i) => {
    setEditId(i.id);
    setEditForm({
      name: i.name,
      sku: i.sku,
      price: i.price,
      brand: i.brand,
      stock: i.stock,
      description: i.description || ''
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
      await updateMarketplace(id, {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock)
      });
      setSuccess('Đã cập nhật sản phẩm!');
      setEditId(null);
      loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  if (loading) return <div>Đang tải danh sách marketplace...</div>;
  if (error) return <div style={{color:'red'}}>Lỗi: {error}</div>;

  return (
    <div>
      <h2>Danh sách sản phẩm marketplace</h2>
      <form onSubmit={handleSubmit} style={{marginBottom:16, border:'1px solid #ccc', padding:12, display:'inline-block'}}>
        <b>Thêm sản phẩm mới</b><br/>
        <input name="name" placeholder="Tên" value={form.name} onChange={handleChange} required />{' '}
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required />{' '}
        <input name="price" placeholder="Giá" value={form.price} onChange={handleChange} required type="number" />{' '}
        <input name="brand" placeholder="Thương hiệu" value={form.brand} onChange={handleChange} required />{' '}
        <input name="stock" placeholder="Tồn kho" value={form.stock} onChange={handleChange} required type="number" />{' '}
        <input name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} style={{width:120}} />{' '}
        <button type="submit" disabled={creating}>Tạo sản phẩm</button>
      </form>
      {success && <div style={{color:'green'}}>{success}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:16}}>
        <thead>
          <tr style={{background:'#f0f0f0'}}>
            <th style={{border:'1px solid #ccc',padding:8}}>ID</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Tên</th>
            <th style={{border:'1px solid #ccc',padding:8}}>SKU</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Giá</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Thương hiệu</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Tồn kho</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Mô tả</th>
            <th style={{border:'1px solid #ccc',padding:8}}></th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td style={{border:'1px solid #ccc',padding:8}}>{i.id}</td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <input name="name" value={editForm.name} onChange={handleEditChange} />
                ) : i.name}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <input name="sku" value={editForm.sku} onChange={handleEditChange} />
                ) : i.sku}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <input name="price" value={editForm.price} onChange={handleEditChange} type="number" />
                ) : i.price.toLocaleString() + '₫'}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <input name="brand" value={editForm.brand} onChange={handleEditChange} />
                ) : i.brand}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <input name="stock" value={editForm.stock} onChange={handleEditChange} type="number" />
                ) : i.stock}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <input name="description" value={editForm.description} onChange={handleEditChange} style={{width:100}} />
                ) : i.description}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === i.id ? (
                  <>
                    <button onClick={() => handleEditSave(i.id)} style={{color:'green'}}>Lưu</button>{' '}
                    <button onClick={handleEditCancel}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(i)} style={{color:'blue'}}>Sửa</button>{' '}
                    <button onClick={() => handleDelete(i.id)} style={{color:'red'}}>Xóa</button>
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
