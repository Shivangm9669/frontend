import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';

const App = () => (
  <SubscriptionProvider>
    <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
              path="/cart"
              element={
                <ProtectedRoute>
                <CartPage />
                </ProtectedRoute>
              }
              />
              <Route
              path="/profile"
              element={
                <ProtectedRoute>
                <ProfilePage />
                </ProtectedRoute>
              }
              />
              <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                <WishlistPage />
                </ProtectedRoute>
              }
              />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
    </AuthProvider>
  </SubscriptionProvider>
);

export default App;
