let baseUrl = 'http://localhost:3000'
$(document).ready(function(){
    $('#form-login').show()
    $('#form-register').hide()
    $('#listSong').hide()
    $('#navbar').hide()

    $('#signup').click(function(){
        $('#form-login').hide()
        $('#form-register').fadeIn()
        $('#listSong').hide()
        $('#navbar').hide()
    })

    $('#signin').click(function(){
        $('#form-login').fadeIn()
        $('#form-register').hide()
        $('#listSong').hide()
        $('#navbar').hide()
    })

    if(localStorage.access_token){
        $('#form-login').hide()
        $('#form-register').hide()
        $('#listSong').show()
        $('#navbar').show()
    }else{
        $('#form-login').show()
        $('#form-register').hide()
        $('#listSong').hide()
        $('#navbar').hide()
    }

  // search songs
  $('#searchBtn').click(function(e) {
    e.preventDefault()

    let query = encodeURIComponent($('#search').val())
    $.ajax({
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      },
      url: `${baseUrl}/songs/search?q=${query}`,
    })
      .done(function(response) {
         $('#search-results').empty()
        response.forEach(song => {
          $('#search-results').append(`<div id=${song.trackId} class="card" style="width: 18rem;">
      <img src="${song.artworkUrl}" class="card-img-top" alt="Artwork Image">
      <div class="card-body">
        <h5 class="card-title song-title">${song.title}</h5>
        <p class="card-text song-artist">${song.artist}</p>
        <p class="card-text song-album">${song.album}</p>
        <p class="card-text song-genre">${song.genre}</p>
        <p class="card-text song-duration">${convertDuration(song.trackTimeMillis)}</p>
<p class="d-none song-releaseDate">${song.releaseDate}</p>
<p class="d-none card-text song-trackId">${song.trackId}</p>
<p class="d-none card-text song-appleStoreUrl">${song.appleStoreUrl}</p>
<p class="d-none card-text song-previewUrl">${song.previewUrl}</p>
        <button id="${song.trackId}-btn" type="submit" class="add-playlist btn btn-primary">Add to Playlist</button>
      </div>
    </div>`)

          $(`#${song.trackId}-btn`).click(function(e) {
            e.preventDefault()
            let data = {
              title: song.title,
              artist: song.artist,
              album: song.album,
              genre: song.genre,
              releaseDate: song.releaseDate,
              trackId: song.trackId,
              appleStoreUrl: song.appleStoreUrl,
              previewUrl: song.previewUrl,
              artworkUrl: song.artworkUrl,
              trackTimeMillis: song.trackTimeMillis,
            }

            $.ajax({
              method: 'POST',
              headers: {
                access_token: localStorage.access_token
              },
              url: `${baseUrl}/songs`,
              data
            })
              .done(resp => {
                console.log(resp)
              })
              .fail(err => {
                console.log(err)
              })
          })
        })
      })
      .fail(err=>{
        console.log(err, '=> error')
      })
      .always( () => {
        encodeURIComponent($('#search').val(''))
      })
  })
});

  $('#logout').click(function(event){
    event.preventDefault()
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('#form-login').show()
    $('#form-register').hide()
    $('#listSong').hide()
    $('#navbar').hide()
    $('#search-results').empty()

})

$('#register-btn').click(function(event){
    event.preventDefault()
    var email = $('#email-register').val()
    var password = $('#password-register').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data:{
            email,
            password
        }
    })
    .done(response=>{
        $('#form-register').hide(2000)
        $('#form-login').fadeIn()
        $('#listSong').hide()
        $('#navbar').hide()
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
        $('#email-register').val('')
        $('#password-register').val('')
    })
})

$('#login-btn').click(function(event){
    event.preventDefault()
    var email = $('#email').val()
    var password = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data:{
            email,
            password
        }
    })
    .done(response=>{
        localStorage.setItem('access_token', response.access_token)
        $('#form-login').hide()
        $('#listSong').show()
        $('#navbar').show()
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
})

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login/google`,
        data:{id_token}
    })
    .done(response=>{
        localStorage.setItem('access_token', response.access_token)
        $('#form-login').hide()
        $('#listSong').show()
        $('#navbar').show()
    })
    .fail((xhr, status )=>{

    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
}

function convertDuration(trackTimeMillis) {
  // TODO improve padding
  let trackTimeS = Math.floor(trackTimeMillis / 1000)
  return `${Math.floor(trackTimeS / 60)}:${trackTimeS % 60}`
}

$('#nav-search').click(function(e) {
  e.preventDefault()

  $('#songs-search').show()
  $('#songs-results').show()
  $('#my-playlist').hide()
})

$('#nav-my-playlist').click(function(e) {
  e.preventDefault()

  $('#songs-search').hide()
  $('#songs-results').hide()
  $('#my-playlist').show()
  $('#my-playlist').empty()

  $.ajax({
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    },
    url: `${baseUrl}/songs`,
  })
  .done(function(response) {
        response.forEach(song => {
          $('#my-playlist').append(`<div id=${song.trackId} class="card" style="width: 18rem;">
      <img src="${song.artworkUrl}" class="card-img-top" alt="Artwork Image">
      <div class="card-body">
        <h5 class="card-title song-title">${song.title}</h5>
        <p class="card-text song-artist">${song.artist}</p>
        <p class="card-text song-album">${song.album}</p>
        <p class="card-text song-genre">${song.genre}</p>
        <p class="card-text song-duration">${convertDuration(song.trackTimeMillis)}</p>
<p class="d-none song-releaseDate">${song.releaseDate}</p>
<p class="d-none card-text song-trackId">${song.trackId}</p>
<p class="d-none card-text song-appleStoreUrl">${song.appleStoreUrl}</p>
<p class="d-none card-text song-previewUrl">${song.previewUrl}</p>
        <button id="${song.trackId}-btn" type="submit" class="show-details btn btn-primary">Show Details</button>
      </div>
    </div>`)

        })
      })
})
