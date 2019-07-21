require 'constraints/versions'
Rails.application.routes.draw do
  devise_for :users, skip: %I[registrations]
  namespace :api,
            defaults: { format: :json },
            path: '/' do
    scope module: :v1,
          constraints: Versions.new(version: 1, default: true) do
      resources :users, only: %i[show create update destroy me] do
        post 'me', on: :collection
        put 'join', on: :collection
      end
      resources :sessions, only: %i[create destroy]
      resources :home, only: %i[index]
      resources :organisations, only: %i[create update destroy]
    end
  end
end