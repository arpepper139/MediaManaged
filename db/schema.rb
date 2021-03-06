# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180215183539) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "genre_assignments", force: :cascade do |t|
    t.bigint "genre_id", null: false
    t.string "assignable_type", null: false
    t.bigint "assignable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignable_type", "assignable_id"], name: "index_genre_assignments_on_assignable_type_and_assignable_id"
    t.index ["genre_id", "assignable_id", "assignable_type"], name: "genre_assigns_index", unique: true
    t.index ["genre_id"], name: "index_genre_assignments_on_genre_id"
  end

  create_table "genres", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_genres_on_name", unique: true
  end

  create_table "movie_ownerships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "movie_id", null: false
    t.integer "user_rating"
    t.index ["movie_id"], name: "index_movie_ownerships_on_movie_id"
    t.index ["user_id"], name: "index_movie_ownerships_on_user_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "name", null: false
    t.string "director", null: false
    t.string "studio"
    t.string "poster"
    t.string "year", null: false
    t.string "runtime"
    t.text "description"
    t.decimal "imdb_rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_movies_on_name", unique: true
  end

  create_table "show_ownerships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "show_id", null: false
    t.integer "user_rating"
    t.index ["show_id"], name: "index_show_ownerships_on_show_id"
    t.index ["user_id"], name: "index_show_ownerships_on_user_id"
  end

  create_table "shows", force: :cascade do |t|
    t.string "name", null: false
    t.string "writer", null: false
    t.string "studio"
    t.string "poster"
    t.string "start_year", null: false
    t.string "end_year"
    t.text "description"
    t.decimal "imdb_rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_shows_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name"
    t.string "profile_photo"
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["provider"], name: "index_users_on_provider"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid"], name: "index_users_on_uid"
  end

end
