import { useEffect, useState } from 'react';
import { fetchReports, createReport, updateReport, deleteReport } from '../services/reportService';

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', content: '', type: '', date: '' });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', type: '', date: '' });

  const loadReports = () => {
    setLoading(true);
    fetchReports()
      .then(data => setReports(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReports();
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
      await createReport({
        ...form,
        createdAt: form.date || new Date().toISOString()
      });
      setSuccess('Tạo báo cáo thành công!');
      setForm({ title: '', content: '', type: '', date: '' });
      loadReports();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa báo cáo này?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteReport(id);
      setSuccess('Đã xóa báo cáo!');
      loadReports();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setEditForm({
      title: r.title,
      content: r.content,
      type: r.type || '',
      date: r.createdAt ? r.createdAt.slice(0, 10) : ''
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
      await updateReport(id, {
        ...editForm,
        createdAt: editForm.date || new Date().toISOString()
      });
      setSuccess('Đã cập nhật báo cáo!');
      setEditId(null);
      loadReports();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  if (loading) return <div>Đang tải danh sách báo cáo...</div>;
  if (error) return <div style={{color:'red'}}>Lỗi: {error}</div>;

  return (
    <div>
      <h2>Danh sách báo cáo</h2>
      <form onSubmit={handleSubmit} style={{marginBottom:16, border:'1px solid #ccc', padding:12, display:'inline-block'}}>
        <b>Thêm báo cáo mới</b><br/>
        <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} required />{' '}
        <input name="content" placeholder="Nội dung" value={form.content} onChange={handleChange} required style={{width:180}} />{' '}
        <input name="type" placeholder="Loại" value={form.type} onChange={handleChange} />{' '}
        <input name="date" type="date" value={form.date} onChange={handleChange} />{' '}
        <button type="submit" disabled={creating}>Tạo báo cáo</button>
      </form>
      {success && <div style={{color:'green'}}>{success}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:16}}>
        <thead>
          <tr style={{background:'#f0f0f0'}}>
            <th style={{border:'1px solid #ccc',padding:8}}>ID</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Tiêu đề</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Nội dung</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Loại</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Người tạo</th>
            <th style={{border:'1px solid #ccc',padding:8}}>Ngày tạo</th>
            <th style={{border:'1px solid #ccc',padding:8}}></th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td style={{border:'1px solid #ccc',padding:8}}>{r.id}</td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === r.id ? (
                  <input name="title" value={editForm.title} onChange={handleEditChange} />
                ) : r.title}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === r.id ? (
                  <input name="content" value={editForm.content} onChange={handleEditChange} style={{width:120}} />
                ) : r.content}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === r.id ? (
                  <input name="type" value={editForm.type} onChange={handleEditChange} />
                ) : r.type}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>{r.createdBy}</td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === r.id ? (
                  <input name="date" type="date" value={editForm.date} onChange={handleEditChange} />
                ) : new Date(r.createdAt).toLocaleString()}
              </td>
              <td style={{border:'1px solid #ccc',padding:8}}>
                {editId === r.id ? (
                  <>
                    <button onClick={() => handleEditSave(r.id)} style={{color:'green'}}>Lưu</button>{' '}
                    <button onClick={handleEditCancel}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(r)} style={{color:'blue'}}>Sửa</button>{' '}
                    <button onClick={() => handleDelete(r.id)} style={{color:'red'}}>Xóa</button>
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
