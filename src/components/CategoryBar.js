import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCatsQuery } from "../store/api/categoryApi";


function CategoryBar() {
  const {data: categories = []} = useGetCatsQuery();
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  return (
    <div className="category_ctn" style={{ padding: "10px", display: "flex" }}>
      <div className="category" style={{ flex: "1", textAlign: "center" }}>
        <Link to="/index" onClick={() => setActiveCategoryId(null)}>
          All
        </Link>
      </div>
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="category"
          style={{ flex: "1", textAlign: "center" }}
        >
          <Link
            to={`/index/cat/${category.categoryId}`}
            onClick={() => setActiveCategoryId(category.categoryId)}
            style={{
              color:
                activeCategoryId === category.categoryId
                  ? "#FF0083"
                  : "inherit",
            }}
          >
            {category.categoryName}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
