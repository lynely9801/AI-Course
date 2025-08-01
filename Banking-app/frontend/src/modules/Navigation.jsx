
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Trang chủ', to: '/dashboard', icon: '🏦' },
  { label: 'Tính năng', to: '/features', icon: '✨' },
  { label: 'Thông báo', to: '/notification', icon: '🔔' },
  { label: 'Admin', to: '/admin', icon: '👤' },
];

const Navigation = () => {
  const location = useLocation();
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.95)',
        borderTop: '1px solid #eee',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '6px 0',
      }}
      className="fintech-bottom-nav"
    >
      {navItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            textAlign: 'center',
            flex: 1,
            color: location.pathname === item.to ? '#6a11cb' : '#333',
            textDecoration: 'none',
            fontWeight: location.pathname === item.to ? 600 : 400,
            fontSize: 15,
            padding: '2px 0',
          }}
        >
          <div style={{ fontSize: 22 }}>{item.icon}</div>
          <div style={{ fontSize: 12 }}>{item.label}</div>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
