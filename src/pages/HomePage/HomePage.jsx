import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Main } from "./HomePageStyled";
import TopContent from "../../components/TopContent/TopContent";
import MainContainer from "../../components/MainContainer/MainContainer";
import { debounce } from "lodash";

const HomePage = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsDataHeadline, setNewsDataHeadline] = useState(null);
  const [newsDataHasMore, setNewsDataHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [extraLoading, setExtraLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState(""); // New state for input value
  const [totalNews, setTotalNews] = useState(0);

  // Debounce the search value update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      setOffset(0);
      setNewsData([]);
      setNewsDataHasMore(true);
      setSearch(value);
    }, 300),
    []
  );

  // Handle input value change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update the input value immediately
    debouncedSearch(value); // Debounce the search operation
  };

  const handleSearchClose = () => {
    setInputValue(""); // Clear the input value
    setSearch(""); // Clear the search value
    setOffset(0);
    setNewsData([]);
    setNewsDataHasMore(true);
    setLoading(true);
  };

  const fetchNormalData = useCallback(async () => {
    setExtraLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FETCHNEWS}${offset}`
      );
      const newData = response.data.data;
      setTotalNews(response.data.total);

      if (!newsDataHeadline && offset === 0) {
        setNewsDataHeadline(newData.slice(0, 4));
      }
      setNewsData((prevNewsData) => [...prevNewsData, ...newData]);
    } catch (error) {
      console.error("Error fetching normal news data:", error);
    } finally {
      setExtraLoading(false);
      setLoading(false);
    }
  }, [offset, newsDataHeadline]);

  const fetchSearchData = useCallback(async () => {
    setExtraLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SEARCHNEWS}${search}?limit=30&offset=${offset}`
      );
      const newData = response.data.data;
      setTotalNews(response.data.total);
      setNewsData((prevNewsData) => [...prevNewsData, ...newData]);
    } catch (error) {
      console.error("Error fetching search news data:", error);
    } finally {
      setExtraLoading(false);
      setLoading(false);
    }
  }, [search, offset]);

  useEffect(() => {
    setNewsDataHasMore(totalNews > newsData.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsData]);

  useEffect(() => {
    if (newsDataHasMore) {
      if (search) {
        fetchSearchData();
      } else {
        fetchNormalData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNormalData, fetchSearchData, offset, search]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      setOffset((prevOffset) => prevOffset + 30);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const modNewsData = () => {
    let temp;

    if (search) {
      temp = [...newsData];
    } else {
      temp = newsData.filter(
        (itemA) => !newsDataHeadline.some((itemB) => itemB._id === itemA._id)
      );
    }

    const resultData = temp.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t._id === value._id)
    );

    return resultData;
  };

  return (
    <React.Fragment>
      <Main>
        <TopContent
          search={inputValue} // Pass the immediate input value
          handleSearch={handleInputChange} // Handle input change
          handleSearchClose={handleSearchClose}
        />
        <MainContainer
          search={inputValue} // Pass the immediate input value
          newsData={modNewsData()}
          extraLoading={extraLoading}
          newsDataHeadline={newsDataHeadline}
          loading={loading}
        />
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
