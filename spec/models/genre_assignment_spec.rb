require 'rails_helper'

RSpec.describe GenreAssignment, type: :model do

  describe "associations" do
    it { should belong_to :genre }
    it { should belong_to :assignable }
  end
end
