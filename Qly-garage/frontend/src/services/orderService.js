export async function createOrder(data) {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể tạo đơn hàng');
  }
  return res.json();
}

export async function updateOrder(id, data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể cập nhật đơn hàng');
  }
  return res.json();
}

export async function deleteOrder(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/orders/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể xóa đơn hàng');
  }
  return res.json();
}
// Service gọi API đơn hàng
export async function fetchOrders() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Không thể tải danh sách đơn hàng');
  return res.json();
}
