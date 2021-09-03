// error handle
document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    //clear search
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        // please write something to display
    }
    else {
        //load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = books => {
    console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (books.length == 0) {
        //console.log(show no result found) ;
        const getResult = document.querySelector('#result');
        getResult.innerHTML = `<h3 class="text-danger">No Data Found</h3>`;
    }
    else {
        books.forEach(book => {
            console.log(book);
            const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
   
        <div class="card h-100">
            <img src="${url}" class="card-img-top" style="width:100%; height:50%"; alt="...">
            <div class="card-body">
                <h5 class="card-title"> Title: ${book.title}</h5>
                <h5 class="author-name">Author-name: ${book.author_name}</h5>
                <h5 class="publisher-name">Publisher: ${book.publisher}</h5>
                <h5 class="first-published">Published-year: ${book.first_publish_year}</h5>
                <p class="card-text">${book.text.slice(0, 200)}</p>
            </div>
        </div>
        `;
            searchResult.appendChild(div);


            getResult = document.querySelector('#result');
            getResult.innerHTML = `<h3 class="text-light">Search Result : 20 of ${book.numFound}</h3>`;
        })
    }
}