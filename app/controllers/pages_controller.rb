class PagesController < ApplicationController
  
  def wanted
    @title = "Wanted"
  end
  
  def skills
    @title = "Skills"
  end

  def eligibility
    @title = "Eligibility"
  end
  
  def crew
    @title = "Crew"
  end
  
  def community
    @title = "Community"
  end
  
  def apply
    @title = "Apply"
    @tweet = Twitter::Client.new.user('codeacademy').status.text
  end
end
