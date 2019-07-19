require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET #show' do
    before(:each) do
      @user = create(:user)
      get :show, params: { id: @user.id, format: :json }
    end

    it 'returns the information about a reporter on a hash' do
      user_response = json_response
      expect(user_response[:email]).to eql @user.email
    end

    it { should respond_with 200 }
  end

  describe 'POST #create' do
    context 'when is succesfully created' do
      before(:each) do
        @user_attributes = attributes_for(:user)
        # second argument to `post` must be a value to `params` hash to pass the tests
        post :create, params: { user: @user_attributes }
      end

      it 'renders the json representation for the user record just created' do
        user_response = json_response
        expect(user_response[:email]).to eql @user_attributes[:email]
      end

      it { should respond_with 201 }
    end

    context 'when is not created' do
      before(:each) do
        @invalid_user_attributes = { password: '1234567a', password_confirmation: '1234567a' }
        # second argument to `post` must be a value to `params` hash to pass the tests
        post :create, params: { user: @invalid_user_attributes }
      end

      it 'renders an errors json' do
        user_response = json_response
        expect(user_response).to have_key(:error)
      end

      it 'renders the json errors on why the user could not be created' do
        user_response = json_response
        expect(user_response[:error][:email]).to include "can't be blank"
      end

      it { should respond_with 422 }
    end
  end

  describe 'PUT/PATCH #update' do
    before(:each) do
      @user = create(:user)
      api_authorization_header @user.auth_token
    end
    context 'when is successfully updated' do
      before(:each) do
        patch :update, params: { id: @user.id,
                                 user: { email: 'newmail@example.com' } }
      end

      it 'renders the json representation for the updated user' do
        user_response = json_response
        expect(user_response[:email]).to eql 'newmail@example.com'
      end

      it { should respond_with 200 }
    end

    context 'when is not created' do
      before(:each) do
        patch :update, params: { id: @user.id,
                                 user: { email: 'bademail.com' } }
      end

      it 'renders an errors json' do
        user_response = json_response
        expect(user_response).to have_key(:errors)
      end

      it 'renders the json errors on whye the user could not be created' do
        user_response = json_response
        expect(user_response[:errors][:email]).to include 'is invalid'
      end

      it { should respond_with 422 }
    end
  end

  describe 'POST #me' do
    before(:each) do
      @user = create(:user)
    end

    context 'when the credentials are correct' do
      before(:each) do
        api_authorization_header @user.auth_token
        post :me
      end
      it 'returns the user record corresponding to the given credentials' do
        user_response = json_response
        expect(user_response[:name]).to eql @user.name
      end
      it { should respond_with 200 }
    end

    context 'when the credentials are incorrect' do
      before(:each) do
        api_authorization_header 'authtokenwrong'
        get :me
      end
      it 'returns a json with an error' do
        expect(json_response[:error]).to eql 'Authorization Fail'
      end
      it { should respond_with 422 }
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @user = create(:user)
      api_authorization_header @user.auth_token
      delete :destroy, params: { id: @user.id }
    end
    it { should respond_with 204 }
  end
end
