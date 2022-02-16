import React, { useState, useEffect, useMemo } from "react";
import ArticlesList from "../components/ArticlesList";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import NotFoundPage from "./NotFoundPage";

const ArticlesPage = ({ match }) => {
  const name = match.params.name;

  const [articlesList, setArticlesList] = useState([]);
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const listResult = await fetch(`/api/articles/`);

      const body = await result.json();
      const listBody = await listResult.json();

      setArticleInfo(body);
      setArticlesList(listBody);
    };

    fetchData();
  }, [name]);

  const article = useMemo(
    () => articlesList.find((article) => article.name === name),
    [articlesList, name]
  );

  const otherArticles = useMemo(
    () => articlesList.filter((article) => article.name !== name),
    [articlesList, name]
  );

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article.title}</h1>
      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlesPage;
