function Movies_popular() {
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=6f0b8be39a25f8460c0779a846620e36&language=es-VE&page=1';
    return new Promise(async (resolve, reject) => {
        const result = await $.ajax({
            url: url,
            type: 'POST',
        });
        $('#Popular_movies').html('');
        for (let i = 0; i < result.results.length; i++) {
            $('#Popular_movies').append(`      
            <div   class="max-w-sm hover:scale-105 ease-out duration-300  border border-gray-200 rounded-lg shadow-md bg-gray-800 border-gray-700">
                <a onclick="contenido_modal('${result.results[i].id}')">
                    <img  class="rounded-t-lg" src="https://image.tmdb.org/t/p/w500/${result.results[i].poster_path}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-xl font-bold tracking-tight text-white">${result.results[i].original_title}</h5>
                    </a>
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p class="ml-2 text-sm font-bold text-white">${result.results[i].vote_average}</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium  underline hover:no-underline text-white">${result.results[i].vote_count} reviews</a>
                        </div>
                  </div>
            </div>
        `);
        }
        resolve(result);
    });
}

async function Movies_masvaloraciones() {
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=6f0b8be39a25f8460c0779a846620e36&language=es-VE&page=1';

    return new Promise(async (resolve, reject) => {
        const result = await $.ajax({
            url: url,
            type: 'GET',
        });
        $('#Movies_recomendaciones  ').html('');
        for (let i = 0; i < result.results.length; i++) {
            $('#Movies_recomendaciones  ').append(`      
            <div class="max-w-sm hover:scale-105 ease-out duration-300  border border-gray-200 rounded-lg shadow-md bg-gray-800 border-gray-700">
                <a  onclick="contenido_modal('${result.results[i].id}')">
                    <img class="rounded-t-lg" src="https://image.tmdb.org/t/p/w500/${result.results[i].poster_path}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-xl font-bold tracking-tight text-white">${result.results[i].original_title}</h5>
                    </a>
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p class="ml-2 text-sm font-bold text-white">${result.results[i].vote_average}</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium  underline hover:no-underline text-white">${result.results[i].vote_count} reviews</a>
                        </div>
                  </div>
            </div>
        `);
        }
        resolve(result);
    });
}
let category = [];
async function Category() {
    let valor = await $.ajax({
        url: 'http://api.themoviedb.org/3/genre/list?api_key=22be462e6d3de1dbab03d1ca50847b5a',
        type: 'GET',
    });

    category = valor.genres;
}

async function contenido_modal(id_video) {
    modal.show();
    let json_video = await $.ajax({
        url: `https://api.themoviedb.org/3/movie/${id_video}/videos?api_key=6f0b8be39a25f8460c0779a846620e36&language=en-US`,
        type: 'GET',
    });
    let json_info = await $.ajax({
        url: `https://api.themoviedb.org/3/movie/${id_video}?api_key=6f0b8be39a25f8460c0779a846620e36&language=es-ES`,
        type: 'GET',
    });
    $('#titulo').html(`${json_info.title}`);
    $('#video').html(`<iframe width="100%" height="450" src="https://www.youtube.com/embed/${json_video.results[0].key}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    $('#descripcion').html(`${json_info.overview}`);
}


function clear_modal() {

    $('#titulo').html(`<div role="status" class="max-w-sm animate-pulse"><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div></div>`);
    $('#video').html(`<div class="animate-pulse flex justify-center items-center w-full h-72 bg-gray-300 rounded sm:w-full dark:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-200">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"></path></svg></div>`);
    $('#descripcion').html(`<div role="status" class="space-y-2.5 animate-pulse max-w-lg">
    <div class="flex items-center space-x-2 w-full"><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div> <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div><div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div></div>
    <div class="flex items-center w-full space-x-2 max-w-[480px]">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>`);
    
}
