// Service gọi API kho
export async function fetchInventory() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/inventory', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Không thể tải danh sách kho');
  return res.json();
}
