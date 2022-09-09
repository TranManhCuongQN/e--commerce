import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect nó sẽ chạy khi productId thay đổi mình sẽ gọi lại Api để fetch lại dữ liệu
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.get(productId);
        console.log('result:', result);
        setProduct(result);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
      setLoading(false);
    })();
  }, [productId]);
  return { product, loading };
}
