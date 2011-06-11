class HomeController < ApplicationController
  
  def index
    @contact_message = ContactMessage.new
  end
end