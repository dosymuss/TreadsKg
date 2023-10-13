import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SearchNav from "../../../components/search/searchNav/SearchNav";
import NavItem from "../navItem/NavItem";
import homeIcon from "../../../img/nav/homeIcon.svg";
import actvityIcon from "../../../img/nav/activityIcon.svg";
import searchIcon from "../../../img/nav/searchIcon.svg";
import searchAc from "../../../img/nav/searchAc.svg";
import writeIcon from "../../../img/nav/writeIcon.svg";
import profileIcon from "../../../img/nav/profileIcon.svg";
import treadLogo from "../../../img/nav/treadLogo.svg";
import activityAc from "../../../img/nav/activityAc.svg";
import homeAc from "../../../img/nav/homeAct.svg";
import profAc from "../../../img/nav/profAc.svg";
import writeAc from "../../../img/nav/writeAc.svg";

import styles from "./Navbar.module.css";
import CreateModal from "../../modal/CreateModal/CreateModal";
import CreateModalNav from "../../modal/CreateModal/CreateModalNav/CreateModalNav";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [create, setCreate] = useState(false)
  const searchRef = useRef()

  const location = useLocation();

  const path = location.pathname;

  const toggleSearchModal = () => {
    setSearch(!search);
    setActiveLink("search");
  };

  const writeModal = () =>{
    setCreate(!create)
    setSearch(false)
    setActiveLink("write");
  }

  useEffect(() => {
    // Функция для обработки клика вне компоненты
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        // Клик вне компоненты
        // Здесь можно выполнить действия, которые нужно сделать при клике вне компоненты
        setSearch(false); // Например, закрыть компоненту
      }
    };

    // Добавляем слушатель события клика на всем документе
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Убираем слушатель события при размонтировании компоненты
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (!search) {
    return (
      <div>
        <div className={styles.navMain}>
          <div>
            <div className={styles.logoDiv}>
              <img src={treadLogo} alt="" />
            </div>
            <NavItem
              isActive={path === "/main"}
              img={homeIcon}
              imgClick={homeAc}
              desc={"Home"}
              path={"/main"}
              onClick={() => {
                setActiveLink("home");
              }}
            />
            <NavItem
              isActive={activeLink === "search" || path === "/searchprof"}
              img={searchIcon}
              imgClick={searchAc}
              desc={"Search"}
              onClick={() => {
                toggleSearchModal();
              }}
            />
            <NavItem
              isActive={activeLink === "write"}
              img={writeIcon}
              desc={"Write a thread"}
              imgClick={writeAc}
              onClick={() => {
                writeModal()
              }}
            />
            <NavItem
              isActive={path === "/activity"}
              img={actvityIcon}
              imgClick={activityAc}
              desc={"Activity"}
              path={"/activity"}
              onClick={() => {
                setActiveLink("activity");
              }}
            />
            <NavItem
              isActive={path === "/profile"}
              img={profileIcon}
              desc={"Profile"}
              path={"/profile"}
              imgClick={profAc}
              onClick={() => {
                setActiveLink("profile");
              }}
            />
          </div>
        </div>
<CreateModalNav active={create} setActive={setCreate}>

</CreateModalNav>
      </div>

    );
  } else {
    return (
      <div>
        <div className={styles.navMain} ref={searchRef}>
          <div>
            <div className={styles.logoDiv}>
              <img src={treadLogo} alt="" />
            </div>
            <NavItem
              isActive={path === "/main"}
              img={homeIcon}
              path={"/main"}
              imgClick={homeAc}
              onClick={() => {
                setActiveLink("home");
              }}
            />
            <NavItem
              isActive={activeLink === "search" || path === "/searchprof"}
              img={searchIcon}
              imgClick={searchAc}
              onClick={() => {
                setActiveLink("search");
                toggleSearchModal();
              }}
            />
            <NavItem
              isActive={activeLink === "write"}
              img={writeIcon}
              imgClick={writeAc}
              onClick={() => {
                writeModal()
              }}
            />
            <NavItem
              isActive={activeLink === "/activity"}
              img={actvityIcon}
              path={"/activity"}
              imgClick={activityAc}
              onClick={() => {
                setActiveLink("activity");
              }}
            />
            <NavItem
              isActive={path === "/profile"}
              img={profileIcon}
              path={"/profile"}
              imgClick={profAc}
              onClick={() => {
                setActiveLink("profile");
              }}
            />
          </div>
          <div className={styles.searchDiv}>
            <SearchNav />
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
