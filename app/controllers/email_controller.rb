class EmailController < ApplicationController
  
  def send_it
    CodeacademyMailer.contact_us(params[:student][:email]).deliver
    unless Student.exists?(:email => params[:student][:email])
      Student.create!(params[:student])
    end
  end
  
end
