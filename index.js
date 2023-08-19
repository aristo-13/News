

  const API_KEY = 'c9e7e603a2424477ab07a4016cb28885';
  const SearchInput = document.querySelector('#search');
  const Searchbtn = document.querySelector('.search-btn');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  let count = 0; // Global count for the slider
  let intervalId = null; // Variable to store the interval ID
  let load = document.querySelector('.load')

  
  function showLoadingAnimation() {
    load.style.display = 'block';
    setTimeout(() =>{
      
        load.style.display = 'none'
    },3000) 
    
}
  function hideLoadingAnimation() {
   
}
  Searchbtn.addEventListener('click', fetchNews);


  
  function fetchNews() {
    showLoadingAnimation()
      const doc = document.querySelector('.main');
      doc.innerHTML = '';
  
      
      fetch(`https://newsapi.org/v2/everything?q=${SearchInput.value}&apiKey=${API_KEY}`)
          .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
          .then(data => {
              for (const article of data.articles) {
                  doc.innerHTML += `
                      <div class='box'>
                          <img src='${article.urlToImage}' alt='image'>
                          <div class='innerText'>
                              <span class='title'>${article.title}</span>
                              <button class='read'><a href='${article.url}'>Read More</a></button>
                          </div>
                      </div>
                  `;
                 
              }
             
          })
          .catch(error => console.log(error));
          SearchInput.value = ''
  
  }
  
  window.onload = function () {
    showLoadingAnimation()
      fetch(`https://newsapi.org/v2/everything?q=ghana%20sports&apiKey=${API_KEY}`)
          .then(response => 
            response.ok ? response.json() : Promise.reject(response.statusText)
        )
          .then((data) => {
            homepg(data)
        })
          .catch(error => console.log(error));
  };
  
  let pg = document.querySelectorAll('.page')
  function showpg(id){
    for(let i = 0; i < pg.length; i++){
      pg[i].style.display = 'none'
    }
   
  
    document.getElementById(id).style.display = 'block'
  }
  
  function homepg(data) {
      const slide = document.querySelector('.slider-image');
      const covertext = document.querySelector('.cover-text');
  
      const updateSlide = () => {
          slide.src = data.articles[count].urlToImage;
          covertext.textContent = data.articles[count].title;
      };
  
      next.addEventListener('click', () => {
          clearInterval(intervalId); // Cancel the interval
          count = (count + 1) % data.articles.length;
          updateSlide();
      });
  
      prev.addEventListener('click', () => {
          clearInterval(intervalId); // Cancel the interval
          count = (count - 1 + data.articles.length) % data.articles.length;
          updateSlide();
      });
  
      // Start the interval
      intervalId = setInterval(() => {
          count = (count + 1) % data.articles.length;
          updateSlide();
      }, 3000);
  
      updateSlide();
  }
  

  function pagesetting(id){
    showpg(id)
    pages(id)
  } 
  
function pagesetting(id) {
    showpg(id);
    pages(id);
}

function pages(categoryId) {
    showLoadingAnimation()
    const doc = document.querySelector('.page#' + categoryId + ' .main');
    // Construct the URL with the provided category ID
    fetch(`https://newsapi.org/v2/everything?q=${categoryId}%20sports&apiKey=${API_KEY}`)
        .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
        .then(data => {
            doc.innerHTML = ''; // Clear the existing content
            for (const article of data.articles) {
                doc.innerHTML += `
                    <div class='box'>
                        <img src='${article.urlToImage}' alt='image'>
                        <div class='innerText'>
                            <span class='title'>${article.title}</span>
                            <button class='read'><a href='${article.url}'>Read More</a></button>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => console.log(error));
}

SearchInput.addEventListener('keydown', (event) =>{
   if(event.key === 'Enter'){
    fetchNews()
   }
})