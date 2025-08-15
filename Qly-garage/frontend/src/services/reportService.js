export async function createReport(data) {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể tạo báo cáo');
  }
  return res.json();
}

export async function updateReport(id, data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/reports/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể cập nhật báo cáo');
  }
  return res.json();
}

export async function deleteReport(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/reports/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const d = await res.json();
    throw new Error(d.error || 'Không thể xóa báo cáo');
  }
  return res.json();
}
// Service gọi API báo cáo
export async function fetchReports() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/reports', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Không thể tải danh sách báo cáo');
  return res.json();
}
