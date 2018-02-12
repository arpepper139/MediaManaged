# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

users = [
  {
    email: "apepperanderson@gmail.com",
    password: "password",
    first_name: "Andrew",
    last_name: "Pepper-Anderson",
    remote_profile_photo_url: "https://s3.amazonaws.com/media-managed-development/uploads/user/profile_photo/1/Andrew_Pepper-Anderson.jpg"
  }
]

users.each do |user_params|
  email = user_params[:email]
  user = User.find_or_initialize_by(email: email)
  user.assign_attributes(user_params)
  user.save
end

movies = [
  {
    name: "Star Wars: Episode IV - A New Hope",
    director: "George Lucas",
    studio: "20th Century Fox",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    year: "1977",
    runtime: "121 min",
    description: "Death star go boom!",
    imdb_rating: 8.6
  }, {
    name: "Star Wars: Episode V - The Empire Strikes Back",
    director: "George Lucas",
    studio: "20th Century Fox",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    year: "1980",
    description: "Did not go as Luke expected",
    imdb_rating: 8.8
  }, {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    studio: "New Line Cinema",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    year: "2001",
    description: "Ring is bad. Gotta destroy it",
    imdb_rating: 8.8
  }, {
    name: "The Lion King",
    director: "Roger Allers, Rob Minkoff",
    studio: "Disney",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
    year: "1994",
    description: "King of pride rock",
    imdb_rating: 8.5
  }, {
    name: "A Bug's Life",
    director: "John Lasseter",
    studio: "Pixar",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BNThmZGY4NzgtMTM4OC00NzNkLWEwNmEtMjdhMGY5YTc1NDE4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    year: "1994",
  }, {
    name: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    year: "1999",
  }, {
    name: "The Incredibles",
    director: "Brad Bird",
    studio: "Pixar",
    year: "2004",
    imdb_rating: 8.0
  }
]

movies.each do |movie_params|
  name = movie_params[:name]
  movie = Movie.find_or_initialize_by(name: name)
  movie.assign_attributes(movie_params)
  if movie.save!
    MovieOwnership.find_or_create_by!(user: User.find(1), movie: movie)
  end
end

shows = [
  {
    name: "Avatar: The Last Airbender",
    writer: "Michael Dante DiMartino, Bryan Konietzko",
    studio: "Nickelodeon",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzZlZmQyYTgtOWNmMy00NTNhLTgyOTYtNjhiOTllOGU2MDg5XkEyXkFqcGdeQXVyMjYxMzY2NDk@._V1_SX300.jpg",
    start_year: "2005",
    end_year: "2008",
    description: "Best. Show. Ever.",
    imdb_rating: 9.2
  }, {
    name: "The Legend of Korra",
    writer: "Michael Dante DiMartino, Bryan Konietzko",
    studio: "Nickelodeon",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BZGE4NzM4YzktNmY5NS00OTgzLWJkYWItMWRjZGIzMjIzNTVlXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_SX300.jpg",
    start_year: "2012",
    end_year: "2014",
    imdb_rating: 8.6
  }, {
    name: "Archer",
    writer: "Adam Reed",
    studio: "FX",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg3NTMwMzY2OF5BMl5BanBnXkFtZTgwMDcxMjQ0NDE@._V1_SX300.jpg",
    start_year: "2009",
    imdb_rating: 8.7
  }, {
    name: "Game of Thrones",
    writer: "David Benioff, D.B. Weiss",
    studio: "HBO",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_SX300.jpg",
    start_year: "2011",
    imdb_rating: 9.5
  }, {
    name: "Silicon Valley",
    writer: "John Altschuler, Mike Judge, Dave Krinsky",
    studio: "HBO",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTA4MTE3MTQwMF5BMl5BanBnXkFtZTgwNzk4MTg4MTI@._V1_SX300.jpg",
    start_year: "2014",
    imdb_rating: 8.6
  }, {
    name: "Veep",
    writer: "Armando Iannucci",
    start_year: "2012",
    remote_poster_url: "https://images-na.ssl-images-amazon.com/images/M/MV5BODUxMDI2Mzc5Nl5BMl5BanBnXkFtZTgwNTQ0OTc2MTI@._V1_SX300.jpg",
  }, {
    name: "Adventure Time",
    writer: "Pendleton Ward",
    studio: "Cartoon Network",
    start_year: "2010",
    imdb_rating: 8.6
  }
]

shows.each do |show_params|
  name = show_params[:name]
  show = Show.find_or_initialize_by(name: name)
  show.assign_attributes(show_params)
  if show.save!
    ShowOwnership.find_or_create_by!(user: User.find(1), show: show)
  end
end
