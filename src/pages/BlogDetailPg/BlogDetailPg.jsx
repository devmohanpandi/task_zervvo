import { Link, useParams } from "react-router-dom";
import { blogs } from "../../utilis/data";
import styles from "./BlogDetailPg.module.scss";

const BlogDetailPg = () => {
  const { id } = useParams();

  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/" className={styles.backBtn}>
          ← Back
        </Link>

        <img src={blog.image} alt={blog.title} />

        <span>{blog.category}</span>

        <h1>{blog.title}</h1>

        <div className={styles.meta}>
          <p>{blog.author}</p>
          <p>{blog.date}</p>
        </div>

        <p className={styles.content}>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetailPg;
