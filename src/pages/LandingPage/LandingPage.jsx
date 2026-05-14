import React from "react";
import styles from "./LandingPage.module.scss";
import Products from "../../components/Products/Products";
import BlogCard from "../../components/BlogCard/BlogCard";

const LandingPage = () => {
  return (
    <div className={styles.landing_page_main_div}>
      <Products />
      <BlogCard />
    </div>
  );
};

export default LandingPage;
