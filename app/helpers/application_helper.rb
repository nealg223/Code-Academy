module ApplicationHelper
  
  # Return a title on a per-page basis
  def title
    base_title = "Code Academy"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end
  
  def tweet
    @tweet = Twitter::Client.new.user('codeacademy').status.text
  end
end
