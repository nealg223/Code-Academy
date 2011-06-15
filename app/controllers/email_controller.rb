class EmailController < ApplicationController
  
  def send_it
    CodeacademyMailer.contact_us(params[:email]).deliver
  end
  
end
