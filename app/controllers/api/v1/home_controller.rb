# frozen_string_literal: true

module Api
  module V1
    # Home Controller
    class HomeController < ApplicationController
      before_action :authenticate_with_token!
      # rubocop:disable all
      def index
        data = User.home(current_user.organisation, home_params)
        render json: { organisations: data[:organisations],
                       organisation: data[:organisation],
                       shifts:
                           if data[:shifts].present?
                             JSON.parse(data[:shifts].to_json(only: %I[_id start_time end_time break_length],
                                                              include: { user: { only: :name } }))
                           else
                             []
                           end }
      end
      # rubocop:enable all

      private

      def home_params
        params[:page] = params[:page] || 1
        params[:per_page] = params[:per_page] || 20
        params
      end
    end
  end
end
