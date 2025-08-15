// Sửa user
export async function updateUser(id, data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể cập nhật user');
  }
  return res.json();
}
// Xóa user
export async function deleteUser(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Không thể xóa user');
  }
  return res.json();
}
// Service gọi API user
export async function fetchUsers() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Không thể tải danh sách user');
  return res.json();
}

// Tạo user mới
export async function createUser({ username, password, role }) {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ username, password, role })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Không thể tạo user');
  }
  return res.json();
}
