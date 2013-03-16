SquashSimulator::Application.routes.draw do
  root :to => 'home#index'

  resources :users

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  get '/simulation' => 'pages#simulation'
  get '/datatable' => 'pages#datatable'
end
