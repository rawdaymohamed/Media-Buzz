import { signout } from './api-auth';

const authenticate = (jwt, cb) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
  }
  cb();
};
const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'));
  }
  return false;
};
// Optional if you use cookies
const clearJWT = (cb) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt');
  }
  signout().then(() => {
    document.cookie = 't=; expires=Thu, 1 Jan 1970 00:00:00 UTC; path=/;';
  });
  cb();
};
export { authenticate, isAuthenticated, clearJWT };
