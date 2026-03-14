import { APIproduct } from "./contain.js";
import { params, setLengthProduct } from "./variable.js";

export const fetchApi = async(api) =>{
  const response = await fetch(api);
  const total = response.headers.get("X-Total-Count"); 
  const result = await response.json();
  setLengthProduct(total);
  return result;
}

export const getAPI = () => {
  const keyword = normalizeText(params.title || "");
  let api = `${APIproduct}?search_key_like=${keyword}`;
  if (params.size && params.size !== "") api += `&sizes_like=${params.size}`;
  if (params.category && params.category !== "") api += `&category=${params.category}`;
  if (params.subCategory) api += `&sub_category=${params.subCategory}`;
  api += `&_page=${params.page}&_limit=${params.limit}`;
  if (params.sort) api += `&_sort=${params.sort}&_order=${params.order}`;
  if (params.sale) api += `&is_sale=true`;
  if (params.new) api += `&is_new=true`;
 if (params.minPrice) api += `&price_gte=${params.minPrice}`;
if (params.maxPrice) api += `&price_lte=${params.maxPrice}`;
  console.log(params);
  console.log(api);
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