import React, { Component, useState, useEffect } from "react";
import facade from "./apifacade";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
const URL = "https://idon.dk/exambackend";

export default function App() {
  const [movies, setMovies] = useState([]);
  const inputfield = { input: "" };
  const [search, setSearch] = useState(inputfield);

  useEffect(() => {
    const options = facade.makeOptions("GET", true);
    fetch(URL + "/api/movie/all", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data);
      });
  }, []);
  const handleInput = evt => {
    const target = evt.target;
    const value = evt.target.value;
    setSearch({ ...search, input: value });

    console.log(search);
  };
  const lowercasedFilter = search.input.toLowerCase();
  const filteredData = movies.filter(movie => {
    return Object.keys(movie).some(key =>
      movie[key]
        .toString()
        .toLowerCase()
        .includes(lowercasedFilter)
    );
  });

  return (
    <div class="container-fluid">
      <h1>Welcome to the online movie library</h1>
      <NavLink to="/login">Login</NavLink>
      <p>Search for book:</p>

      <form>
        <input
          id="searchTitle"
          placeholder="keyword"
          onChange={handleInput}
          input
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Votes</th>
            <th>Director</th>
            <th>Actor</th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((movie, i) => (
            <tr key={i}>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.votes}</td>
              <td>{movie.directors_name}</td>
              <td>{movie.actors}</td>
              <td>{movie.genres}</td>
              <NavLink to="/admin" movies={movies}>
                Edit
              </NavLink>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
