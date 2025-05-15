document.getElementById("form").onsubmit = async (event) => {
  event.preventDefault();
  const fd = new FormData(event.target);
  const body = {
    title: fd.get("title"),
    authors: fd
      .get("authors")
      .split(",")
      .map((string) => string.trim())
      .filter(Boolean),
    content: fd.get("content"),
    tags: fd
      .get("tags")
      .split(",")
      .map((string) => string.trim())
      .filter(Boolean),
  };
  const res = await fetch("/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    const article = await res.json();
    location.href = "article.html?id=" + article._id;
  } else {
    alert("Ошибка: " + (await res.json()).error);
  }
};
