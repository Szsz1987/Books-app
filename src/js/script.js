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

    const booksList = document.querySelector('.books-list');
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target;

      if(clickedElement.classList.contains('book__image')){
        const id = clickedElement.getAttribute('data-id');
        if(!clickedElement.classList.contains(select.class.favouriteBook)){
          favoriteBooks.push(id);
          clickedElement.classList.add(select.class.favouriteBook);
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove(select.class.favouriteBook);
        }
      }
    });
  };

  render();
  initActions();
}
