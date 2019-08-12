# frozen_string_literal: true

module Api
  module V1
    # Shifts Controller
    class ShiftsController < ApplicationController
      before_action :set_shift, only: %i[show update destroy]
      before_action :new_shift, only: :create
      # GET /shifts
      def index
        @shifts = Shift.all

        render json: @shifts
      end

      # POST /shifts
      def create
        if @shift.save
          data = User.home(current_user.organisation, page_params)
          render json: data
        else
          render json: @shift.errors.full_messages, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /shifts/1
      def update
        if @shift.update(shift_params)
          render json: @shift.to_json(only: %I[_id start_time end_time break_length])
        else
          render json: @shift.errors.full_messages, status: :unprocessable_entity
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

      def new_shift
        @shift = Shift.new(shift_params)
        @shift.user = current_user
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
