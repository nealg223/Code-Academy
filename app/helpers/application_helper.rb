module ApplicationHelper
  
  # Return a title on a per-page basis
  def title
    base_title = "Code Academy"
  end
  
  def tweet
    @tweet = Twitter::Client.new.user('codeacademy').status.text rescue ""
  end
end
