/*Create an application that allows you to use the Google Books API to search for books, and deploy it somewhere that we can access through a web browser.

This application should allow you to:
Type in a query and display a list of books matching that query.
Each item in the list should include the book's author, title, and publishing company, as well as a picture of the book.
From each list item, you should also be able to navigate to more information about the book, but this information does not necessarily need to appear on a page within your application. In other words, this could link out to an external site with more information about that particular book.

There are no constraints n odeployment platform. We recommend using Heroku because it’s free and simple to set up, but it's your choice. For programming language, choose one of the options listed in the Code Review repo, but not the same language you selected for your code review.

Your submission doesn’t need to be perfect. After we receive your submission we'll review your code, respond to you with our feedback, and give you an opportunity to respond to our feedback and make improvements to your code before you re-submit a second and final version.

That said, we would still like to see your best work, which should demonstrate external quality (for example: solves the problem, handles edge cases, usability), internal quality (for example: decoupling, testing, readability), as well as some idea of your process and approach (via your version control history and README).
*/

import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
console.log("hello")

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      method:"Use the dropdown menu to choose search criterion",
      query:"",
      books:[],

    }
  }
  
  handleMethod = (event) =>{
    this.setState({
        method:event.target.value
    })
  }
 
  handleQuery = (event) =>{
    this.setState({
        [event.target.id]:event.target.value
    })
  }
  
  handleClick = (event) =>{
  event.preventDefault();
  if((this.state.query==="")||(this.state.method==="")){
    alert("Please change criteria and/or type something before submitting.");
    return
  }


  if(this.state.method === "ISBN"){
    if(!Number.isInteger(Number(this.state.query))){
     alert("For ISBN, query must be a 10 or 13 digit number")
    }
    else if(Number.isInteger((Number((this.state.query))))){
  
    axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + [this.state.query])
    .then( (response) => {
      if(response.data.totalItems===0){
        alert("Your search had no results");
        return
      }
      else{ 
      // let booksCopy = [this.state.books]
      // booksCopy.push(response.data)

      this.setState({
        books: response.data
      })
      }
    })
        .catch((error)=>{
          console.log(error)
      })
    }
  }
  

  else if(this.state.method === "Title"){
      
    axios.get("https://www.googleapis.com/books/v1/volumes?q=inTitle:" + this.state.query)
          .then((response) => {
            if(response.data.totalItems===0){
              alert("Your search had no results. Please try a new search.");
              return
            }
            else{ 
              this.setState({
                books: response.data
              })
            }
          })
          .catch((error)=> {
            console.log(error)
          })
    }

    else if(this.state.method === "Keyword"){
      

      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.query)
      .then((response) => {
        if(response.data.totalItems===0){
          alert("Your search had no results. Please try a new search.");
          return
        }
        else{ 
          this.setState({
            books: response.data
          })
        }
      })
      .catch((error)=> {
        console.log(error)
      })
    }
  

  else if(this.state.method === "Author"){
      
    axios.get("https://www.googleapis.com/books/v1/volumes?q=inAuthor:" + this.state.query)
    .then((response) => {
      if(response.data.totalItems===0){
        alert("Your search had no results. Please try a new search.");
        return
      }
      else{ 
        this.setState({
          books: response.data
        })
      }
    })
    .catch((error)=> {
      console.log(error)
    })
}

  else if(this.state.method === "Genre"){
      
    axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:" + this.state.query)
    .then((response) => {
      if(response.data.totalItems===0){
        alert("Your search had no results. Please try a new search.");
        return
      }
      else{ 
        this.setState({
          books: response.data
        })
      }
    })
    .catch((error)=> {
      console.log(error)
    })
  }
}
  render() {
// eslint-disable-next-line
  if (this.state.books!=""){
    
    return (
      <div className="App">
      <p>
            Google Books!
      </p>
          Enter your book query search below:

          <br/>
          Query can be a word in the title, an author's name, ISBN, genre, anything really.
          <br/>
          <br/>
          <form>
             <select onChange={this.handleMethod}>
                <option value=""> Choose a Criterion</option>
                <option value="ISBN">ISBN</option>
                <option value="Genre">Genre</option>
                <option value="Author">Author</option>
                <option value="Keyword">Keyword</option>
                <option value= "Title">Title</option>
            </select>
                  <input type="text" id="query" onChange={this.handleQuery}>
            </input>
          
            <input type="submit" onClick = {this.handleClick}>
            </input>
          </form>
          {this.state.method}
          <br/>
          {this.state.query}
          <br/>
          <div>
          <ol>
            {this.state.books.items.map((el)=>{
              console.log("ELEMENT", el)
              return (
              
              <li key={el.id}>
                <hr/>
              Title: {el.volumeInfo.title} <br/>
              Subtitle: {el.volumeInfo.subtitle} <br/>
              Author(s): {el.volumeInfo.authors} 
              <br/>
              Publisher: {el.volumeInfo.publisher}<br/>
              <br/>
              Image:<br/> 
              <img src={el.volumeInfo.imageLinks.smallThumbnail} alt="No Longer Available"/> 
               <br/>
               <a target="_blank" rel="noopener noreferrer" href = {el.volumeInfo.infoLink}>Click Here for More Information</a>
               </li>)
            })}
          </ol>
        </div>
      </div>
    )
    
            }
else {
  return (
    <div className="App">
    <p>
          Google Books!
    </p>
        Enter your book query search below:

        <br/>
        Query can be a word in the title, an author's name, ISBN, genre, anything really.
        <br/>
        <br/>
        <form>
           <select onChange={this.handleMethod}>
              <option value=""> Choose a Criterion</option>
              <option value="ISBN">ISBN</option>
              <option value="Genre">Genre</option>
              <option value="Author">Author</option>
              <option value="Keyword">Keyword</option>
              <option value= "Title">Title</option>
          </select>
                <input type="text" id="query" onChange={this.handleQuery}>
          </input>
        
          <input type="submit" onClick = {this.handleClick}>
          </input>
        </form>
        {this.state.method}
        <br/>
        {this.state.query}
        <br/>
        </div>
    )}
  }
}
export default App;

