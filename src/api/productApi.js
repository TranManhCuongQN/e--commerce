import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    // Transform _page to _start
    // Tính cái _start dựa trên cái page được truyền xuống
    const newParams = { ...params };
    newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);

    // Remove un-needed key
    // sau khi tính xong remove _page ra khỏi newParams
    delete newParams._page;

    // Fetch product list + count
    // mình sẽ gọi 2 Api 1 cái cho danh sách sản phẩm trả về 1 cái mảng và count trả về cho mình 1 con số
    const productList = await axiosClient.get('/products', { params: newParams });
    const count = await axiosClient.get('/products/count', { params: newParams });

    // Build response and return
    // Sử dụng 2 cái ở trên kết hợp lại ra được 1 bộ dữ liệu thì nó sẽ trả về lên trên component của mình để có đủ thông tin render lên ui
    // Nếu trường hợp backend bạn hỗ trợ paganation luôn rồi thì bạn chỉ cần gọi 1 Api
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
};
export default productApi;
