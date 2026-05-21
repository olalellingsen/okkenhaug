import React from "react";
import NewsList from "../components/NewsList";

export default function newsPage() {
  return (
    <article className="content">
      <h1>News</h1>
      <NewsList />
    </article>
  );
}
