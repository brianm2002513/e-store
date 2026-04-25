import React from 'react';

let mockNavigate = null;
let mockParams = {};
let mockSearchParams = new URLSearchParams();
let mockLocation = { pathname: '/' };

export const Link = ({ to, children, ...props }) => React.createElement('a', { href: to, 'data-testid': 'link', ...props }, children);
export const BrowserRouter = ({ children }) => children;
export const MemoryRouter = ({ children, initialEntries }) => children;
export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ element, children }) => element || children || null;
export const useNavigate = () => (mockNavigate || jest.fn());
export const useParams = () => mockParams;
export const useLocation = () => mockLocation;
export const useSearchParams = () => [mockSearchParams, jest.fn()];
export const useRouteMatch = () => ({ path: '/' });
export const Navigate = ({ to }) => null;
export const Outlet = () => null;
export const NavLink = ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children);

export const __setMockNavigate = (fn) => { mockNavigate = fn; };
export const __setMockParams = (params) => { mockParams = params; };
export const __setMockSearchParams = (params) => { mockSearchParams = new URLSearchParams(params); };
export const __setMockLocation = (location) => { mockLocation = location; };