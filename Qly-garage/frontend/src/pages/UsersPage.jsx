
import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, deleteUser, updateUser } from '../services/userService';


  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', role: 'staff' });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', password: '', role: 'staff' });

  const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
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
      await createUser(form);
      setSuccess('Tạo user thành công!');
      setForm({ username: '', password: '', role: 'staff' });
      loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Bạn có chắc muốn xóa user "${username}"?`)) return;
    setError('');
    setSuccess('');
    try {
      await deleteUser(id);
      setSuccess('Đã xóa user thành công!');
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (u) => {
    setEditId(u.id);
    setEditForm({ username: u.username, password: '', role: u.role });
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
      await updateUser(id, editForm);
      setSuccess('Đã cập nhật user!');
      setEditId(null);
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <form onSubmit={handleSubmit} style={{marginBottom:16, border:'1px solid #ccc', padding:12, display:'inline-block'}}>
        <b>Thêm user mới</b><br/>
        <input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} required />{' '}
        <input name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />{' '}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">admin</option>
          <option value="manager">manager</option>
          <option value="staff">staff</option>
          <option value="customer">customer</option>
        </select>{' '}
        <button type="submit" disabled={creating}>Tạo user</button>
      </form>
      {success && <div style={{color:'green'}}>{success}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {loading ? <div>Đang tải...</div> : (
        <table border="1" cellPadding={6}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Vai trò</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {editId === u.id ? (
                    <input name="username" value={editForm.username} onChange={handleEditChange} />
                  ) : u.username}
                </td>
                <td>
                  {editId === u.id ? (
                    <select name="role" value={editForm.role} onChange={handleEditChange}>
                      <option value="admin">admin</option>
                      <option value="manager">manager</option>
                      <option value="staff">staff</option>
                      <option value="customer">customer</option>
                    </select>
                  ) : u.role}
                </td>
                <td>
                  {editId === u.id ? (
                    <>
                      <input name="password" type="password" placeholder="Mật khẩu mới (bỏ trống nếu không đổi)" value={editForm.password} onChange={handleEditChange} style={{width:140}} />{' '}
                      <button onClick={() => handleEditSave(u.id)} style={{color:'green'}}>Lưu</button>{' '}
                      <button onClick={handleEditCancel}>Hủy</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(u)} style={{color:'blue'}}>Sửa</button>{' '}
                      <button onClick={() => handleDelete(u.id, u.username)} style={{color:'red'}}>Xóa</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
