class CodeacademyMailer < ActionMailer::Base
  default :from => "neal@codeacademy.org"
  
  def contact_us(email)
    @email = email
    mail({:to => "neal@codeacademy.org", :subject => "#{email} says what up CODE ACADEMY"})
  end
end
