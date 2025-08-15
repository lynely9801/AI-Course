export async function createMarketplace(data) {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/marketplace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể tạo sản phẩm marketplace');
  }
  return res.json();
}

export async function updateMarketplace(id, data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/marketplace/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể cập nhật sản phẩm marketplace');
  }
  return res.json();
}

export async function deleteMarketplace(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/marketplace/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể xóa sản phẩm marketplace');
  }
  return res.json();
}
// Service gọi API marketplace
export async function fetchMarketplace() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/marketplace', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Không thể tải danh sách marketplace');
  return res.json();
}
