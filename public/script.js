let currentPage = 1;

document.getElementById('newsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value,
    category: document.getElementById('category').value,
    source_url: document.getElementById('source_url').value
  };

  if (!/^https?:\/\/.+\..+/.test(data.source_url)) {
    alert("Invalid URL");
    return;
  }

  await fetch('/api/news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  e.target.reset();
  loadNews();
});

async function loadNews() {
  const res = await fetch(`/api/news?page=${currentPage}`);
  const { newsItems, total } = await res.json();

  const container = document.getElementById('newsList');
  container.innerHTML = newsItems.map(item => `
    <div>
      <h3>${item.title}</h3>
      <p>${item.content}</p>
      <p><strong>${item.category}</strong></p>
      <a href="${item.source_url}" target="_blank">Source</a>
    </div>
  `).join('');

  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage * 5 >= total;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadNews();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentPage++;
  loadNews();
});

loadNews();