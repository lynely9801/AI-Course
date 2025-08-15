import { Link, Outlet, useNavigate } from 'react-router-dom';
import './MainLayout.css';

export default function MainLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="main-layout">
      <nav className="sidebar">
        <h2>Garage System</h2>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/customers">Khách hàng</Link></li>
          <li><Link to="/inventory">Kho</Link></li>
          <li><Link to="/orders">Đơn hàng</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/reports">Báo cáo</Link></li>
          <li><Link to="/users">Người dùng</Link></li>
          <li><button onClick={handleLogout} style={{background:'none',border:'none',color:'#fff',font:'inherit',cursor:'pointer',padding:0}}>Đăng xuất</button></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
