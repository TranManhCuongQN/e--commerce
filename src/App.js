import './App.css';
import Header from 'components/Header';
import { Route, Routes } from 'react-router-dom';
import ProductFeature from 'feature/Product';
import ListPage from 'feature/Product/Pages/ListPage';
import DetailPage from 'feature/Product/Pages/DetailPage';
import CartFeature from 'feature/Cart';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/products/*" element={<ProductFeature />}></Route>
        <Route path="/cart" element={<CartFeature />}></Route>
      </Routes>
    </div>
  );
}

export default App;
