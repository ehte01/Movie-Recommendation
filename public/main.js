const searchInput = document.querySelector('#searchinput');
const result = document.querySelector('section');
const inputForm = document.querySelector('#form-input');

async function searchMovies(searchText){
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`);
    const movies = await response.json();
    console.log(movies);
    
    
    for(let movie of movies){
        const pattern = new RegExp(`^${searchText}(?!${movie.show.name}), "i"`);
        // const movieName = movie.show.name;
        // const foundMovie = checkName(searchText,movie.show.name);
        // console.log(foundMovie);
        if(movie.show.image!==null &&pattern){

            const div = document.createElement('div');
            div.innerHTML = `<h2>${movie.show.name}</h2>
                <p>year: ${movie.show.premiered}</p>
                <p>runtime: ${movie.show.runtime}</p>
            `
            const images = document.createElement('img');

            images.setAttribute('src',movie.show.image.medium);

            div.append(images);
            result.append(div);
        }
    }
}

inputForm.addEventListener('submit',(e)=>{
    // e.preventDefault();
    const searchValue = searchInput.value;
    console.log(searchValue);
    // if(e.key === "Enter"){
    //     console.log(searchValue);
        
    // }
    searchMovies(searchValue);
    
});
