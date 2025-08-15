// Service gọi API khách hàng
export async function fetchCustomers() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/customers', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Không thể tải danh sách khách hàng');
  return res.json();
}
