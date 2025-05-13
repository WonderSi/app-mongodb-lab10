const table = document.getElementById("resultTable");
const tbody = table.querySelector("tbody");
const authorSel = document.getElementById("authorSelect");

async function fetchJson(url) {
  const res = await fetch(url);
  return res.json();
}

function render(list) {
  tbody.innerHTML = "";
  list.forEach((a, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${a.title}</td>
      <td>${a.authors.join(", ")}</td>
      <td>${new Date(a.postedAt).toLocaleDateString()}</td>
    `;
    tbody.appendChild(tr);
  });
  table.hidden = list.length === 0;
}

document.getElementById("btnAll").onclick = async () =>
  render(await fetchJson("/api/articles"));

document.getElementById("btnByTitle").onclick = async () => {
  const query = document.getElementById("titleInput").value.trim();
  render(
    await fetchJson("/api/articles/search?title=" + encodeURIComponent(query))
  );
};

document.getElementById("btnByAuthor").onclick = async () => {
  const name = authorSel.value;
  if (name)
    render(await fetchJson("/api/articles/author/" + encodeURIComponent(name)));
};

(async () => {
  const authors = await fetchJson("/api/authors");
  authorSel.innerHTML =
    '<option value="">— выберите автора —</option>' +
    authors.map((a) => `<option>${a}</option>`).join("");
})();
