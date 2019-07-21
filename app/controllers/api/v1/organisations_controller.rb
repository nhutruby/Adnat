# frozen_string_literal: true

module Api
  module V1
    # Organisations controller
    class OrganisationsController < ApplicationController
      before_action :set_organisation, only: %i[show update destroy]
      before_action :authenticate_with_token!

      # POST /organisations
      def create
        @organisation = Organisation.new(organisation_params)

        if @organisation.save
          data = User.home(current_user.organisation, page_params)
          render json: data, status: :created, location: [:api, @organisation]
        else
          render json: @organisation.errors.full_messages, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /organisations/1
      def update
        if @organisation.update(organisation_params)
          render json: @organisation.to_json(only: %I[_id name hourly_rate])
        else
          render json: @organisation.errors.full_messages, status: :unprocessable_entity
        end
      end

      # DELETE /organisations/1
      def destroy
        @organisation.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_organisation
        @organisation = Organisation.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def organisation_params
        params.fetch(:organisation, {}).permit(:name, :hourly_rate)
      end

      def page_params
        params[:page] = params[:page] || 1
        params[:per_page] = params[:per_page] || 20
        params
      end
    end
  end
end
