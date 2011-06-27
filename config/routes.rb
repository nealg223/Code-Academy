CodeAcademy::Application.routes.draw do
  
  match '/question', :to => 'pages#question'
  match '/home', :to => 'pages#home'
  match '/what', :to => 'pages#what'
  match '/why', :to => 'pages#why'
  match '/chicago', :to => 'pages#chicago'
  match '/who', :to => 'pages#who'
  match '/pricing', :to => 'pages#pricing'
  match '/contact', :to => 'pages#contact'

  match "send_email" => "email#send_it"
   
  root :to => "pages#home"
  
  # get "pages/why"
  # 
  #   get "pages/pricing"
  # 
  #   get "pages/question"
  #   
  #   get "pages/home"
  # 
  #   get "pages/what"
  # 
  #   get "pages/who"
  # 
  #   get "pages/media"
  # 
  #   get "pages/contact"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
