{
  'use strict';

  const select = {

    wrapper: {
      booksList: '.books-list', // h1 your collection, ul
      filters: '.filters', // <1section<form
    },

    templateOf: {
      book: '#template-book',
    },
  }; // const select

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
    bookImage: 'book__image',
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books; // from data.js
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.booksListWrapper = document.querySelector(select.wrapper.booksList); // h1 your collection, ul
      thisBooksList.filterWrapper = document.querySelector(select.wrapper.filters);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = []; // here are filters already choosen
    }

    render(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const generatedHTML = templates.book(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.booksListWrapper.appendChild(element);
      }
    }

    filterBooks(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;
        for(let filterName of thisBooksList.filters){
          if(!book.details[filterName]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          bookToBeHidden.classList.add(classNames.hidden);
        } else{
          bookToBeHidden.classList.remove(classNames.hidden);
        }
      }
    }

    determineRatingBgc(rating){
      let bgc = '';
      if(rating <6){
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if(rating>6 && rating<=8){
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if(rating>8 && rating<=9){
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if(rating>9){
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return bgc;
    }

    initActions(){
      const thisBooksList = this;
      thisBooksList.booksListWrapper.addEventListener('dblclick', function(event){ // adding and deleting books from favorites
        event.preventDefault();
        const clickedElement = event.target.offsetParent;

        if(clickedElement.classList.contains(classNames.bookImage)){ // book template, cover image
          const id = clickedElement.getAttribute('data-id');

          if(!clickedElement.classList.contains(classNames.favoriteBook)){
            thisBooksList.favoriteBooks.push(id);
            clickedElement.classList.add(classNames.favoriteBook);
          } else{
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(id), 1);
            clickedElement.classList.remove(classNames.favoriteBook);
          }
        }
      });

      thisBooksList.filterWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
          if(clickedElement.checked){
            thisBooksList.filters.push(clickedElement.value);
            thisBooksList.filterBooks();
          } else{
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
            thisBooksList.filterBooks();
          }
        }
      });
    }
  } // class BooksList

  const app = {
    initializeProject: function(){
      new BooksList();
    }
  };

  app.initializeProject();
}
