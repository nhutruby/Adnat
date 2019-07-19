# frozen_string_literal: true

# Authenticable model
module Authenticable
  # Devise methods overwrites
  def current_user
    @current_user ||= User.find_by(auth_token: request.headers['Authorization'])
  end

  def authenticate_with_token!
    return if user_signed_in?

    render json: { errors: 'Not authenticated' }, status: :unauthorized
  end

  def user_signed_in?
    current_user.present?
  end
end
