# frozen_string_literal: true

# Shift Model
class Shift
  include Mongoid::Document
  field :start, type: Time
  field :finish, type: Time
  field :break_length, type: Integer, default: 0

  # Validates
  validates :start, :finish, :break_length, presence: true

  # Associations
  belongs_to :user
  belongs_to :organisation
end
