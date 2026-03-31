// --- QUAN LY THAM SO LOC VA BIEN TOAN CUC ---

// Doi tuong params chua tat ca cac thong so de goi API (loc, sap xep, phan trang)
export let params = {
  title: "",          // Tu khoa tim kiem
  category: "",       // Danh muc chinh (ao, quan, giay...)
  subCategory: "",    // Danh muc con
  sort: "",           // Truong can sap xep (price, quantity...)
  page: "1",          // Trang hien tai
  limit: "12",        // So luong san pham hien thi tren 1 trang
  order: "",          // Thu tu sap xep (asc hoac desc)
  sale: "",           // Loc san pham dang giam gia (true/false)
  new: "",            // Loc san pham moi
  size: "",           // Loc theo kich thuoc
  priceMin: "0",      // Gia thap nhat
  priceMax: "10000000000", // Gia cao nhat
};

// Bien luu tong so luong san pham (dung de tinh toan phan trang)
export let lengthProduct = 100;

// Ham cap nhat tong so luong san pham dua tren ket qua tra ve tu response
export const updateLength = (res) => {
  lengthProduct = res.length;
}

// Ham gan gia tri so luong san pham vao mot doi tuong params cu the
export const setLengthProduct = (params, value) => {
  params.lengthProduct = value;
};

// --- HAM CHUAN HOA TIENG VIET (DUNG CHUNG) ---
// Ham nay giup loai bo dau tieng Viet, ky tu dac biet de tim kiem chinh xac hon
export const normalizeText = (str = "") => {
  if (!str) return "";
  return str
    .toLowerCase()                                        
    .normalize("NFD")               // Tach cac ky tu dau ra khoi chu cai                      
    .replace(/[\u0300-\u036f]/g, "") // Xoa bo cac dau tieng Viet                      
    .replace(/[đĐ]/g, "d")           // Chuyen đ thanh d                    
    .replace(/[^a-z0-9\s]/g, "")     // Chi giu lai chu cai, so va khoang trang                      
    .replace(/\s+/g, " ")            // Thu gon nhieu khoang trang thanh 1                      
    .trim();                         // Xoa khoang trang o hai dau chuoi                      
};