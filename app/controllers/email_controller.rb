class EmailController < ApplicationController
  
  def send_it
    CodeacademyMailer.contact_us(params[:email]).deliver
    Student.create!(:email => params[:email])
  end
  
end
