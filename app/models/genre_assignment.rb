class GenreAssignment < ApplicationRecord
  belongs_to :genre
  belongs_to :assignable, :polymorphic => true
end
