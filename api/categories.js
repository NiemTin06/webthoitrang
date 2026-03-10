import data from "../database.json";

export default function handler(req, res) {
  res.status(200).json(data.categories);
}