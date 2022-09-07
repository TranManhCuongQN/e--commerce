import './App.css';
import Header from 'components/Header';
import { Route, Routes } from 'react-router-dom';
import ProductFeature from 'feature/Product';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/products/*" element={<ProductFeature />} />
      </Routes>
    </div>
  );
}

export default App;
