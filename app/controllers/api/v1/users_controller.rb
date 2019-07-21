# frozen_string_literal: true

module Api
  module V1
    # Users controller
    class UsersController < ApplicationController
      respond_to :json
      before_action :authenticate_with_token!, only: %I[update destroy join]
      def show
        respond_with User.find(params[:id])
      end

      def me
        if current_user
          render json: current_user.serializable_hash(only: :name),
                 status: 200, location: [:api, current_user]
        else
          render json: { error: 'Authorization Fail' }, status: 422
        end
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: user.serializable_hash(only: %I[email name]),
                 status: 201,
                 location: [:api, user]
        else
          puts user.errors.messages
          render json: { error: user.errors.messages }, status: 422
        end
      end

      def update
        user = current_user
        if user.update(user_params)
          render json: user, status: 200, location: [:api, user]
        else
          render json: { errors: user.errors }, status: 422
        end
      end

      def destroy
        current_user.destroy
        head 204
      end

      # JOIN
      def join
        if current_user.update(organisation_id: params[:id])
          data = User.home(current_user.organisation, page_params)
          render json: data, status: :created, location: [:api, current_user]
        else
          render json: current_user.errors.full_messages, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :name,
                                     :password, :password_confirmation)
      end

      def page_params
        params[:page] = params[:page] || 1
        params[:per_page] = params[:per_page] || 20
        params
      end
    end
  end
end
