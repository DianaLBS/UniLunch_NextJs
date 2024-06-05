"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/SessionAuthProvider";
import NewItem from "../../../components/NewItem";
import { useNews } from "../../../context/NewContext";

const NewsPage = () => {
  const { state: authState } = useAuth();
  const { state: newState, dispatch } = useNews();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news`);
        const data = await response.json();
        dispatch({ type: "SET_NEWS", payload: data });
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [dispatch]);
  
  console.log("Antes de loading")
  if (loading) {
    console.log("en loading")
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>News</h1>
      {newState.news.map(news => (
        <NewItem key={news.id} news={news} />
      ))}
    </div>
  );
};

export default NewsPage;
