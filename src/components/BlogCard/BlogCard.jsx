import { Link } from "react-router-dom";
import { blogs } from "../../utilis/data";
import styles from "./BlogCard.module.scss";

const BlogCard = () => {
  return (
    <div className={styles.blog_card_main_section}>
      <div className={styles.header}>
        <h1>Modern Blog</h1>
        <p>Latest articles and development updates</p>
      </div>

      <div className={styles.blogGrid}>
        {blogs.map((post) => (
          <Link to={`/blog/${post.id}`} className={styles.card} key={post.id}>
            <div className={styles.imageWrapper}>
              <img src={post.image} alt={post.title} />
            </div>

            <div className={styles.cardBody}>
              <span>{post.category}</span>

              <h2>{post.title}</h2>

              <p>{post.description}</p>

              <div className={styles.footer}>
                <small>{post.author}</small>
                <small>{post.date}</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
