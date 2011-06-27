require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe EmailController do
  it "creates a user with an email address" do
    post :send_it, :student => {:email => "email@example.com"}
    
    Student.count.should == 1
    Student.find_by_email("email@example.com").should be_present
  end

  describe "with a duplicate email" do
    before(:each) do
      Student.create!(:email => "email@example.com")
    end

    it "doesn't create another student" do
      post :send_it, :student => {:email => "email@example.com"}
    
      Student.count.should == 1
    end
  end
end