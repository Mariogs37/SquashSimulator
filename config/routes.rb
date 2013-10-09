SquashSimulator::Application.routes.draw do
  root :to => 'home#index'

  resources :users

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  get '/simulation' => 'pages#simulation'
  get '/datatable' => 'pages#datatable'
  get '/team_lookup' => 'pages#scrape'
  get '/rankings' => 'pages#rankings'
  get '/ladder' => 'pages#ladder'
  get '/update' => 'pages#get_most_recent_ladder'
end
