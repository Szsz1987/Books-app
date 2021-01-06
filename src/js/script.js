{
  'use strict';

  const select = {
    wrapper: {
      booksList: '.books-list', // books panel, ul
    },
    templateOf: {
      booksList: '#template-book', // book template <script id, type>
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  const bookListWrapper = document.querySelector(select.wrapper.booksList);
  const allBooks = [];

  const render = function(){
    for(let book of dataSource.books){ // from data.js
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      bookListWrapper.appendChild(element);
      allBooks.push(element);
    }
  };
  console.log(allBooks);
  render();
}
