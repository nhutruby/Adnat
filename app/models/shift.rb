# frozen_string_literal: true

# Shift Model
class Shift
  include Mongoid::Document
  field :start_time, type: Time
  field :end_time, type: Time
  field :break_length, type: Integer, default: 0

  # Validates
  validates :start_time, :end_time, :break_length, presence: true

  # Associations
  belongs_to :user
  belongs_to :organisation
end
