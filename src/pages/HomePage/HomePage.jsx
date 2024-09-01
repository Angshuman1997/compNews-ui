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
  const [totalNews, setTotalNews] = useState(0);

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

  const handleSearch = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleSearchClose = () => {
    setSearch("");
    setOffset(0);
    setNewsData([]);
    setNewsDataHasMore(true);
    setLoading(true);
  };

  const fetchNormalData = useCallback(async () => {
    setExtraLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FETCHNEWS}?limit=30&offset=${offset}`
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
    const filteredObject = newsData.filter(
      (itemA) => !newsDataHeadline.some((itemB) => itemB._id === itemA._id)
    );
    return filteredObject;
  };

  return (
    <React.Fragment>
      <Main>
        <TopContent
          search={search}
          handleSearch={handleSearch}
          handleSearchClose={handleSearchClose}
        />
        <MainContainer
          search={search}
          newsData={search ? newsData : modNewsData()}
          extraLoading={extraLoading}
          newsDataHeadline={newsDataHeadline}
          loading={loading}
        />
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
