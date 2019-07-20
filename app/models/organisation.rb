# frozen_string_literal: true

# Organisation Model
class Organisation
  include Mongoid::Document
  field :name, type: String
  field :hourly_rate, type: Integer, default: 0

  # Validates
  validates :name, :hourly_rate, presence: true
  validates :name, uniqueness: true

  # Associations
  has_many :users
  has_many :shifts, dependent: :destroy
end
