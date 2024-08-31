import React, { useState, useEffect } from "react";
import axios from "axios";
import { Main } from "./HomePageStyled";
import TopContent from "../../components/TopContent/TopContent";
import MainContainer from "../../components/MainContainer/MainContainer";

const HomePage = () => {
  const [newsData, setNewsData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://comp-news-backend.vercel.app/api/fetchnews?limit=30&offset=${offset}`
        );
        setNewsData((prevData) => [...prevData, ...response.data.data]);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <MainContainer newsData={newsData} loading={loading} />
      </Main>
    </React.Fragment>
  );
};

export default HomePage;
