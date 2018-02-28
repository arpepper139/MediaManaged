# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

genres = [
  {name: "Action"},
  {name: "Animation"},
  {name: "Comedy"},
  {name: "Drama"},
  {name: "Fantasy"},
  {name: "Horror"},
  {name: "Romance"},
  {name: "Sci-Fi"}
]

genres.each do |genre_params|
  name = genre_params[:name]
  genre = Genre.find_or_initialize_by(name: name)
  genre.save!
end
