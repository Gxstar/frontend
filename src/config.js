const API_BASE_URL = 'http://127.0.0.1:8000'; // 假设你的 API 基础路径是 /api，可以根据实际情况修改

const config = {
  // 品牌管理
  brand: {
    create: `${API_BASE_URL}/brands/`, // POST
    list: `${API_BASE_URL}/brands/`, // GET
    detail: (brandId) => `${API_BASE_URL}/brands/${brandId}`, // GET
    update: (brandId) => `${API_BASE_URL}/brands/${brandId}`, // PUT
    delete: (brandId) => `${API_BASE_URL}/brands/${brandId}`, // DELETE
  },
  // 用户管理
  user: {
    login: `${API_BASE_URL}/users/login`, // POST
    register: `${API_BASE_URL}/users/register`, // POST
    create: `${API_BASE_URL}/users/`, // POST
    list: `${API_BASE_URL}/users/`, // GET
    detail: (userId) => `${API_BASE_URL}/users/${userId}`, // GET
    update: (userId) => `${API_BASE_URL}/users/${userId}`, // PUT
    delete: (userId) => `${API_BASE_URL}/users/${userId}`, // DELETE
  },
  // 相机管理
  camera: {
    create: `${API_BASE_URL}/cameras/`, // POST
    list: `${API_BASE_URL}/cameras/`, // GET
    detail: (cameraId) => `${API_BASE_URL}/cameras/${cameraId}`, // GET
    update: (cameraId) => `${API_BASE_URL}/cameras/${cameraId}`, // PUT
    delete: (cameraId) => `${API_BASE_URL}/cameras/${cameraId}`, // DELETE
  },
  // 镜头管理
  lens: {
    create: `${API_BASE_URL}/lenses/`, // POST
    list: `${API_BASE_URL}/lenses/`, // GET
    detail: (lensId) => `${API_BASE_URL}/lenses/${lensId}`, // GET
    update: (lensId) => `${API_BASE_URL}/lenses/${lensId}`, // PUT
    delete: (lensId) => `${API_BASE_URL}/lenses/${lensId}`, // DELETE
  },
  // 卡口管理
  mount: {
    create: `${API_BASE_URL}/mounts/`, // POST
    list: `${API_BASE_URL}/mounts/`, // GET
    detail: (mountId) => `${API_BASE_URL}/mounts/${mountId}`, // GET
    update: (mountId) => `${API_BASE_URL}/mounts/${mountId}`, // PUT
    delete: (mountId) => `${API_BASE_URL}/mounts/${mountId}`, // DELETE
  },
  // 默认
  default: {
    root: `${API_BASE_URL}/`, // GET
  },
};

export default config;
