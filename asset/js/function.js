import { APIproduct } from "./contain.js";
import { params } from "./variable.js";

// --- CAC HAM TUONG TAC VOI API (CRUD) ---

// Ham lay du lieu tu API (Read)
export const fetchApi = async(api) => {
  const response = await fetch(api);
  const result = await response.json();
  return result;
}

// Ham them moi san pham (Create)
export const addProduct = async (api, data) => {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

// Ham xoa san pham theo ID (Delete)
export const deleteProduct = async (api, id) => {
  await fetch(`${api}/${id}`, {
    method: "DELETE"
  });
};

// Ham cap nhat mot phan thong tin san pham (Update - PATCH)
export const updateProduct = async (api, id, data) => {
  const response = await fetch(`${api}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

// --- HAM XAY DUNG DUONG DAN API DUA TREN BO LOC (FILTER) ---
export const getAPI = () => {
  // Chuan hoa tu khoa tim kiem truoc khi dua vao query
  const keyword = normalizeText(params.title || "");
  let query = [];
  
  // Loc theo tu khoa, kich thuoc, danh muc, danh muc con
  if (keyword) query.push(`search_key_like=${keyword}`);
  if (params.size) query.push(`sizes_like=${params.size}`);
  if (params.category) query.push(`category=${params.category}`);
  if (params.subCategory) query.push(`sub_category=${params.subCategory}`);
  
  // Phan trang (Page & Limit)
  query.push(`_page=${params.page || 1}`);
  query.push(`_limit=${params.limit || 12}`);

  // Sap xep (Sort & Order)
  if (params.sort) {
    query.push(`_sort=${params.sort}`);
    query.push(`_order=${params.order}`);
  }
  
  // Loc theo trang thai: Sale, New, Khoang gia
  if (params.sale) query.push(`is_sale=true`);
  if (params.new) query.push(`is_new=true`);
  if (params.minPrice) query.push(`price_gte=${params.minPrice}`);
  if (params.maxPrice) query.push(`price_lte=${params.maxPrice}`);
  
  // Noi cac tham so lai thanh chuoi API hoan chinh
  const api = `${APIproduct}?${query.join("&")}`;
  console.log("Filtered API URL:", api);
  return api;
}

// --- CAC HAM XU LY CHUOI (STRING PROCESSING) ---

// Ham chuan hoa tieng Viet: Bo dau, viet thuong, xoa ky tu dac biet
// Dung de tim kiem san pham chinh xac hon
export const normalizeText = (str = "") => {
  if (!str) return "";
  return str
    .toLowerCase()                                        
    .normalize("NFD")                                     
    .replace(/[\u0300-\u036f]/g, "") // Xoa dau tieng Viet                      
    .replace(/[đĐ]/g, "d")           // Chuyen đ thanh d                    
    .replace(/[^a-z0-9\s]/g, "")     // Xoa ky tu dac biet                      
    .replace(/\s+/g, " ")            // Thu gon khoang trang thua                      
    .trim();                                              
};

// Ham chuyen tieu de thanh Slug (duong dan than thien)
// Vi du: "Ao Khoác Nam" -> "ao-khoac-nam"
export const convertSlugText = (str = "") => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")   // Thay khoang trang bang dau gach ngang
    .trim();                                            
}