{
  'use strict';

  const select = {
    wrapper: {
      booksList: '.books-list', // h1 your collection, ul
      filters: '.filters', // <1section<form
    },

    templateOf: {
      booksList: '#template-book', // book template <script id, type>
    },

    class: {
      favouriteBook: 'favorite',
      filtered: 'hidden',
    },

    book: {
      bookImage: ''
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const bookListWrapper = document.querySelector(select.wrapper.booksList); // h1 your collection, ul
  const filterWrapper = document.querySelector(select.wrapper.filters);
  const favoriteBooks = [];
  const filters = []; // here are filters already choosen

  const render = function(){
    for(let book of dataSource.books){ // from data.js
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      bookListWrapper.appendChild(element);
    }
  };

  const filterBooks = function(){
    for(let book of dataSource.books){
      const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for(let filterName of filters){
        if(!book.details[filterName]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        bookToBeHidden.classList.add('hidden');
      } else {
        bookToBeHidden.classList.remove('hidden');
      }
    }
  };

  const initActions = function(){

    bookListWrapper.addEventListener('dblclick', function(event){ //adding and deleting books from favorites
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      if(clickedElement.classList.contains('book__image')){ // book template, cover image
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

    filterWrapper.addEventListener('click', function(event){
      const clickedElement = event.target;
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          filterBooks();
        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
          filterBooks();
        }
      }
    });
  };

  render();
  initActions();
}
