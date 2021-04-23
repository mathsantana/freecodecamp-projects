const handleSubmit = (e) => {
  console.log(e);
  e.preventDefault();
  const msg = document.getElementById("msg-submit");
  msg.innerHTML = "Form enviado com sucesso";
  setTimeout(() => (msg.innerHTML = ""), 3000);
};

const insertFilmsInDataList = (array) => {
  const bestMovies = document.getElementById("best-movie");
  const datalist = document.createElement("datalist");
  datalist.setAttribute("id", "datalist");
  array.map((movie) => {
    const id = movie.imdbID;
    const title = movie.Title;
    const option = document.createElement("option", { value: id });
    option.appendChild(document.createTextNode(title));
    datalist.appendChild(option);
  });
  bestMovies.innerText = "";
  bestMovies.appendChild(datalist);
};

const isInDataList = (input, search) => {
  let result = false;
  const options = input.list?.childNodes || [];
  options.forEach((opt) => {
    if (opt.innerText === search) {
      result = true;
    }
  });
  return result;
};

const cleanDatalist = () => {
  const bestMovies = document.getElementById("best-movie");
  bestMovies.innerText = "";
};

const getMovieApiData = (e) => {
  const search = e.target.value;
  search.length >= 3 &&
    !isInDataList(e.target, search) &&
    fetch(`http://www.omdbapi.com/?apikey=9b48c924&s=${search}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let movieList = json.Search.slice(0, 3);
        movieList = movieList.map((value) => {
          return { Title: value.Title, imdbID: value.imdbID };
        });
        insertFilmsInDataList(movieList);
      });
  search.length < 3 && cleanDatalist();
};

let surveyForm = document.getElementById("survey-form");
let inputMovie = document.getElementById("best-movie");
surveyForm.addEventListener("submit", handleSubmit);
inputMovie.addEventListener("input", getMovieApiData);
