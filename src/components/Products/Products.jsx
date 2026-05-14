import React, { useMemo, useState } from "react";
import styles from "./Products.module.scss";
import { products } from "../../utilis/data";
import { FaStar } from "react-icons/fa";

const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("");

  const categoryList = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    if (search.trim()) {
      updatedProducts = updatedProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (item) => item.category === selectedCategory,
      );
    }

    if (sortType === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortType === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    if (sortType === "rating") {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    return updatedProducts;
  }, [search, selectedCategory, sortType]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.topBar}>
        <h1>Product Explorer</h1>

        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price : Low to High</option>
            <option value="highToLow">Price : High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} />
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <h3>{item.name}</h3>
                <span>{item.category}</span>
              </div>

              <div className={styles.cardBottom}>
                <p>${item.price}</p>

                <div className={styles.rating}>
                  <FaStar /> <span>{item.rating}</span>
                </div>
              </div>

              <button>View Product</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
