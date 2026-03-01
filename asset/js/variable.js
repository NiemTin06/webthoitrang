export let params = {
  title:"",
  category:"",
  subCategory: "",
  sort: "",
  page:"1",
  limit:"12",
  order:""
};

export let lengthProduct = 100

export const setLengthProduct = (value) => {
  lengthProduct = value;
};
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