import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "./api";
import { useEffect } from "react";

function CategoryBar() {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="category_ctn" style={{ padding: "10px", display: "flex" }}>
      <div className="category" style={{ flex: "1", textAlign: "center" }}>
        <Link to="/index" onClick={() => setActiveCategoryId(null)}>
          All
        </Link>
      </div>
      {categories.map((category) => (
        <div
          key={category.category_id}
          className="category"
          style={{ flex: "1", textAlign: "center" }}
        >
          <Link
            to={`/index/cat/${category.category_id}`}
            onClick={() => setActiveCategoryId(category.category_id)}
            style={{
              color:
                activeCategoryId === category.category_id
                  ? "#FF0083"
                  : "inherit",
            }}
          >
            {category.category_name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
