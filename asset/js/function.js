import { setLengthProduct } from "./variable.js";

export const fetchApi = async(api) =>{
  const response = await fetch(api);
  const total = response.headers.get("X-Total-Count"); 
  const result = await response.json();
  setLengthProduct(total);
  return result;
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