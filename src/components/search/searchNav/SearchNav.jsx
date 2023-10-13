import { useEffect, useState } from "react";
import SearchItem from "../searchList/SearchItem";
import { getSearch } from "../../../api/search";
import ShortLine from "../../../ui/design/shortLine/ShortLine";
import Loader from "../../../ui/loader/Loader";
import { debounce } from "../../../code/otherCode/code";

import styles from "./searchNav.module.css";

const SearchNav = () => {
  const [value, setValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false)

  console.log(searchList)

  const delayedMakeSearch = debounce(() => {
    getSearch(value)
      .then((res) => {
        console.log(res);
        if (res) {
          setSearchList(res.data.results);
          setEnd(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 1000);

  







  return (
    <div className={styles.main}>
      <p className={styles.title}>Search</p>
      <input
        className={styles.searchInp}
        type="text"
        value={value}
        placeholder="Search"
        onChange={(e) => {
          setValue(e.target.value);
          delayedMakeSearch()
          setEnd(true)
          // setLoading(true)
        }}
        onBlur={()=>{
          setEnd(false)
        }}
      />
      <div>
        {end ? (
          <Loader />
        ) : searchList.length > 0 ? (
          searchList.map((item) => {
            return (
              <div>
                <SearchItem
                  id={item.pk}
                  username={item.username}
                  isFollowed={item.is_followed}
                  setLoading={setEnd}
                />
                <ShortLine search={true} />
              </div>
            );

          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SearchNav;
