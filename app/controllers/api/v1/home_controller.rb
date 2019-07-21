# frozen_string_literal: true

module Api
  module V1
    # Home Controller
    class HomeController < ApplicationController
      before_action :authenticate_with_token!
      def index
        data = User.home(current_user.organisation, home_params)
        render json: data
      end

      private

      def home_params
        params[:page] = params[:page] || 1
        params[:per_page] = params[:per_page] || 5
        params
      end
    end
  end
end
