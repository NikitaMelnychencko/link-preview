const textAreaRef = document.querySelector('.text-area');
const wrapperLinkRef = document.querySelector('.link-list');
const typerRef = document.querySelector('.typer');

if (textAreaRef) {
  textAreaRef.addEventListener('input', async e => {
    let links = [];
    if (e.target.value.length > 0) {
      links = extractLinksFromText(e.target.value);
    }
    if (links.length > 0) {
      typerRef.classList.remove('typer--hide');
      const result = await getPrevLinks(links);
      if (result?.previewData.length > 0)
        appendHtml(result?.previewData, links);
    }
  });
}

function extractLinksFromText(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const matches = text.match(urlRegex);

  return matches || [];
}

async function getPrevLinks(urls) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/prev-link/preview?urls=${JSON.stringify(
        urls,
      )}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching link previews:', error.message);
    throw new Error('Error fetching link previews');
  }
}

function appendHtml(data, links) {
  const result = data.map(({ description, imageUrl, title }, idx) => {
    return `
            <li>
            <a href="${links[idx]}" target="_blank">
            
              <img src='http://localhost:8080/api/prev-link/image-proxy?url=${imageUrl}' alt='${title}' />
              <div>
                <h2>${title}</h2>
                <p>${description}</p>
              </div>
            </a>
          </li>
    `;
  });
  wrapperLinkRef.innerHTML = result.join('');
  typerRef.classList.add('typer--hide');
}
