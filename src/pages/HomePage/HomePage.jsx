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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://comp-news-backend.vercel.app/api/fetchnews?limit=30&offset=${offset}`
        );
        const dataN = [...newsData, ...response.data.data]
        setNewsDataHasMore(response.data.hasMore);
        if(!newsDataHeadline) {
          console.log("here1")
          setNewsDataHeadline(dataN.slice(0, 4));
          setNewsData(dataN.slice(4));
        } else {
          console.log("here2")
          setNewsData(dataN);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (newsDataHasMore) {
      fetchData();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

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
        <TopContent />
        <MainContainer newsData={newsData} loading={loading} newsDataHeadline = {newsDataHeadline}/>
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
