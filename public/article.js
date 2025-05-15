const id = new URLSearchParams(location.search).get("id");

async function fetchJson(url) {
  const res = await fetch(url);
  return res.json();
}

(async () => {
  const article = await fetchJson("/api/articles/" + id)
  const wrap = document.getElementById("article");
  wrap.innerHTML = `
    <h1>${article.title}</h1>
    <p><em>${article.authors.join(", ")}</em> · ${new Date(
    article.postedAt
  ).toLocaleDateString()}</p>
    <article>${article.content.replace(/\n/, "<br>")}</article>
    <h2>Рецензии (${article.reviews.length})</h2>
    <ul>${article.reviews
      .map(
        (review) =>
          `<li><strong>${review.name}</strong> [${review.rating}/10]: ${review.text}</li>`
      )
      .join("")}</ul>
  `;
})();
