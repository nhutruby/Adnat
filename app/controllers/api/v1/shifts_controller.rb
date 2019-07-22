# frozen_string_literal: true

module Api
  module V1
    # Shifts Controller
    class ShiftsController < ApplicationController
      before_action :set_shift, only: %i[show update destroy]

      # GET /shifts
      def index
        @shifts = Shift.all

        render json: @shifts
      end

      # rubocop:disable all
      # POST /shifts
      def create
        @shift = Shift.new(shift_params)
        @shift.user = current_user
        if @shift.save
          data = User.home(current_user.organisation, page_params)
          render json: { organisations: data[:organisations],
                         organisation: data[:organisation],
                         shifts:
                             if data[:shifts].present?
                               JSON.parse(data[:shifts].to_json(only: %I[_id start_time end_time break_length],
                                                     include: { user: { only: :name } }))
                             else
                               []
                             end }, status: :created, location: [:api, @shift]
        else
          render json: @shift.errors.full_messages, status: :unprocessable_entity
        end
      end
      # rubocop:enable all

      # PATCH/PUT /shifts/1
      def update
        if @shift.update(shift_params)
          render json: @shift
        else
          render json: @shift.errors, status: :unprocessable_entity
        end
      end

      # DELETE /shifts/1
      def destroy
        @shift.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_shift
        @shift = Shift.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def shift_params
        params.fetch(:shift, {}).permit(:start_time, :end_time, :break_length, :organisation_id)
      end

      def page_params
        params[:page] = params[:page] || 1
        params[:per_page] = params[:per_page] || 20
        params
      end
    end
  end
end
