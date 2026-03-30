
import { APIproduct } from "./contain.js";
import { params } from "./variable.js";

export const fetchApi = async(api) =>{
  const response = await fetch(api);
  const result = await response.json();
  return result;
}

export const addProduct = async (api, data) => {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export const deleteProduct = async (api, id) => {
  await fetch(`${api}/${id}`, {
    method: "DELETE"
  });
};

export const updateProduct = async (api, id, data) => {
  const response = await fetch(`${api}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

export const getAPI = () => {
  const keyword = normalizeText(params.title || "");
  let query = [];
  
  if (keyword) query.push(`search_key_like=${keyword}`);
  if (params.size) query.push(`sizes_like=${params.size}`);
  if (params.category) query.push(`category=${params.category}`);
  if (params.subCategory) query.push(`sub_category=${params.subCategory}`);
  
  query.push(`_page=${params.page || 1}`);
  query.push(`_per_page=${params.limit || 12}`);





  if (params.sort) {
    query.push(`_sort=${params.sort}`);
    query.push(`_order=${params.order}`);
  }
  
  if (params.sale) query.push(`is_sale=true`);
  if (params.new) query.push(`is_new=true`);
  if (params.minPrice) query.push(`price_gte=${params.minPrice}`);
  if (params.maxPrice) query.push(`price_lte=${params.maxPrice}`);
  
  const api = `${APIproduct}?${query.join("&")}`;
  console.log("Filtered API URL:", api);
  return api;
}

export const normalizeText = (str = "") => {
  if (!str) return "";
  return str
    .toLowerCase()                                        
    .normalize("NFD")                                      
    .replace(/[\u0300-\u036f]/g, "")                       
    .replace(/[đĐ]/g, "d")                               
    .replace(/[^a-z0-9\s]/g, "")                           
    .replace(/\s+/g, " ")                                  
    .trim();                                              
};

export const convertSlugText = (str = "") =>{
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")   // đổi khoảng trắng thành -
    .trim();                                            
}