class PagesController < ApplicationController
  
  def home
    @title = "Home"
  end

  def what
    @title = "What"
  end

  def who
    @title = "Who"
  end

  def media
    @title = "Media"
  end

  def contact
    @title = "Contact"
  end

end
