export function getAuth() {
  if (typeof window === 'undefined') return { token: null, role: null, hasPaid: false };
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  const role = adminToken ? 'admin' : (localStorage.getItem('role') || null);
  const hasPaid = localStorage.getItem('hasPaid') === 'true';
  return { token: token || adminToken, role, hasPaid };
}

export function setUserAuth({ token, hasPaid }) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', 'user');
  localStorage.setItem('hasPaid', String(!!hasPaid));
}

export function setAdminAuth(token) {
  localStorage.setItem('adminToken', token);
  localStorage.setItem('role', 'admin');
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('role');
  localStorage.removeItem('hasPaid');
}