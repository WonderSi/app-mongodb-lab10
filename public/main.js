const table = document.getElementById("resultTable");
const tbody = table.querySelector("tbody");
const authorSel = document.getElementById("authorSelect");

async function fetchJson(url) {
  const res = await fetch(url);
  return res.json();
}

function icon(svg, title = "") {
  return `<span id="ico" style="cursor: pointer" title="${title}">${svg}</span>`;
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
      <td>
        ${icon("👀", "Открыть")}
        ${icon("🗑️", "Удалить")}
        ${icon("➕", "Создать")}
      </td>
    `;
    tr.querySelector('#ico[title="Открыть"]').onclick = () =>
      (location.href = `article.html?id=${a._id}`);
    tr.querySelector('#ico[title="Удалить"]').onclick = async () => {
      if (confirm("Удалить статью?")) {
        await fetch("/api/articles/" + a._id, { method: "DELETE" });
        tr.remove();
      }
    };
    tr.querySelector('#ico[title="Создать"]').onclick = () =>
      (location.href = "create.html");
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

document.getElementById("btnByDate").onclick = async () => {
  const from = document.getElementById("dateFrom").value;
  const to = document.getElementById("dateTo").value;
  const queryString = new URLSearchParams({ from, to }).toString();
  const data = await fetchJson("/api/articles/by-date?" + queryString);
  render(data);
};

document.getElementById("btnTop").onclick = async () => {
  const list = await fetchJson("/api/articles/top");
  render(list);
};

(async () => {
  const authors = await fetchJson("/api/authors");
  authorSel.innerHTML =
    '<option value="">— выберите автора —</option>' +
    authors.map((a) => `<option>${a}</option>`).join("");
})();
