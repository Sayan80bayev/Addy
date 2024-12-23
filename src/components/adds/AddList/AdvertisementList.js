import React, { useState, useEffect } from "react";
import LoadingIcon from "../../LoadingIcon";
import Adds from "./Adds";
import { useAdvertisements } from "./hooks";
import { useGetCatsQuery } from "../../../store/api/categoryApi";

export const AdvertisementList = () => {
  // State to store filter values as an object
  const [filter, setFilter] = useState({
    categoryId: "",
    createdAfter: "",
    createdBefore: "",
    minPrice: "",
    maxPrice: "",
  });

  const [filterRequest, setFilterRequest] = useState({
    categoryId: "",
    createdAfter: "",
    createdBefore: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch advertisements with the current filter
  const { advertisements, isFetching, refetch: fetchAdvertisements } = useAdvertisements(filterRequest);
  const { data: categories} = useGetCatsQuery()
  // Handle form input change for the filter state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle form submission for filtering (trigger refetching)
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    setFilterRequest(filter)
  };

  return (
    <>
      {/* Filter section */}
      <div className="mb-3">
        <h4>Filter Advertisements</h4>
        <form onSubmit={handleFilterSubmit}>
          <div className="row" style={{ alignItems: "center", gap: "20px" }}>
            <div className="col-md-3">
              <label htmlFor="categoryId" className="form-label">Category</label>
              <select
                id="categoryId"
                name="categoryId"
                className="form-select"
                style={{ width: "200px" }}
                value={filter.categoryId}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="createdAfter" className="form-label">Created After</label>
              <input
                type="datetime-local"
                id="createdAfter"
                name="createdAfter"
                className="form-control"
                value={filter.createdAfter}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="createdBefore" className="form-label">Created Before</label>
              <input
                type="datetime-local"
                id="createdBefore"
                name="createdBefore"
                className="form-control"
                value={filter.createdBefore}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="minPrice" className="form-label">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="form-control"
                value={filter.minPrice}
                onChange={handleInputChange}
                step="0.01"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="maxPrice" className="form-label">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="form-control"
                value={filter.maxPrice}
                onChange={handleInputChange}
                step="0.01"
              />
            </div>

            <div className="col-md-3 mt-3">
              <button type="submit" className="btn btn-primary">Apply Filters</button>
            </div>
          </div>
        </form>
      </div>

      {/* Display advertisements */}
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
};