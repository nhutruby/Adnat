FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { '1234567a' }
    password_confirmation { '1234567a' }
    name { Faker::Name.name }
  end
end
