# frozen_string_literal: true

module Api
  module V1
    # Sessions Controller
    class SessionsController < ApplicationController
      before_action :set_user, only: :create
      def create
        if @user&.valid_password?(params[:session][:password])
          sign_in @user, store: false
          @user.generate_authentication_token!
          @user.save
          render json: @user.serializable_hash(only: %I[auth_token name]),
                 status: 200, location: [:api, @user]
        else
          render json: { error: 'Invalid email or password' }, status: 422
        end
      end

      def destroy
        user = User.find_by(auth_token: params[:id])
        user.generate_authentication_token!
        user.save
        head 204
      end

      private

      def set_user
        @user = params[:session][:email].present? && User.find_by(email: params[:session][:email])
      end
    end
  end
end
