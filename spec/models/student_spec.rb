require 'spec_helper'

describe Student do
  it "has an email address" do
    student = Student.new(:email => "email@example.com")
    student.should be_valid
  end
end
