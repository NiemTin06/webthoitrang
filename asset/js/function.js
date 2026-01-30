export const fetchApi = async(api) =>{
  const response = await fetch(api);
  const result = await response.json();
  return result;
}

export const normalizeText = (str = "") => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .trim();
};
