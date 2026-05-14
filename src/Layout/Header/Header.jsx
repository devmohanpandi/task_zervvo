import { useContext } from "react";

import styles from "./Header.module.scss";
import { ThemeContext } from "../../utilis/context/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        Task
      </Link>
      <div className={styles.link_btn_div}>
        <Link to={"/weather"}>Weather</Link>
        <button onClick={toggleTheme} className={styles.themeBtn}>
          {darkMode ? <MdLightMode /> : <RiMoonFill />}
        </button>
      </div>
    </header>
  );
};

export default Header;
