import React, { useState, useEffect } from "react";
import axios from "axios";
import { Main } from "./HomePageStyled";
import TopContent from "../../components/TopContent/TopContent";
import MainContainer from "../../components/MainContainer/MainContainer";

const HomePage = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsDataHeadline, setNewsDataHeadline] = useState(null);
  const [newsDataHasMore, setNewsDataHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [extraLoading, setExtraLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const handleSearch = (e) =>{
    setOffset(0);
    setNewsDataHasMore(true);
    setSearch(e.target.value);
  }

  const handleSearchClose = () =>{
    setSearch('');
    setOffset(0);
    setLoading(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      setExtraLoading(true);
      try {
        let response;
        if(search) {
          response = await axios.get(
            `${process.env.REACT_APP_SEARCHNEWS}${search}?limit=30&offset=${offset}`
          );
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_FETCHNEWS}${offset}`
          );
        }
        
        const dataN = [...newsData, ...response.data.data]
        setNewsDataHasMore(response.data.hasMore);
        if(!newsDataHeadline && !search) {
          setNewsDataHeadline(dataN.slice(0, 4));
          setNewsData(dataN.slice(4));
        } else {
          setNewsData(dataN);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setExtraLoading(false);
        setLoading(false);
      }
    };

    if (newsDataHasMore) {
      fetchData();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setOffset((prevOffset) => prevOffset + 30);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <Main>
        <TopContent search={search} handleSearch={handleSearch} handleSearchClose={handleSearchClose} />
        <MainContainer search={search} newsData={newsData} extraLoading={extraLoading} newsDataHeadline = {newsDataHeadline} loading={loading}/>
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
