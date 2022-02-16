import React, { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";

const ArticlesListPage = () => {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/`);
      const body = await result.json();
      setArticlesList(body);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articlesList} />
    </>
  );
};

export default ArticlesListPage;
