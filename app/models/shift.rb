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

=begin
  before_save :set_utc_time

  private

  def set_utc_time
    self.start_time = Time.parse(self.start_time).getutc
    self.end_time = Time.parse(self.end_time).getutc
  end
=end
end
