import { createContext } from "react";
const CategoryContext = createContext({
  categories: [],
  currentSelectedCategory: null,
  setCategory: () => {},
});

export default CategoryContext;
