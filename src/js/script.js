{
  'use strict';

  const select = {
    wrapper: {
      booksList: '.books-list', // books panel, ul
    },
    templateOf: {
      booksList: '#template-book', // book template <script id, type>
    },

    class: {
      favouriteBook: 'favorite',
    },

    book: {
      bookImage: ''
    },

  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const bookListWrapper = document.querySelector(select.wrapper.booksList);
  const allBooks = [];
  const favoriteBooks = [];

  const render = function(){
    for(let book of dataSource.books){ // from data.js
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      bookListWrapper.appendChild(element);
      allBooks.push(element);
    }
  };

  const initActions = function(){
    for(let book of allBooks){
      const bookCover = book.querySelector('.book__image');
      console.log(bookCover);

      bookCover.addEventListener('dblclick', function(event){
        event.preventDefault();
        const id = bookCover.getAttribute('data-id');
        if(!bookCover.classList.contains(select.class.favouriteBook)){
          favoriteBooks.push(id);
          bookCover.classList.add(select.class.favouriteBook);
          console.log('dodalem ksiazke!');
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          bookCover.classList.remove(select.class.favouriteBook);
        }
        console.log('Favorite Books', favoriteBooks);
      });
    }
  };
  console.log(allBooks);
  render();
  initActions();
}
