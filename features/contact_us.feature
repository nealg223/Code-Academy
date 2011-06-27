Feature: Contact us
  In order to get notified of Code Academy application status
  As a potential student
  I want to submit my email address

  Scenario: Saving the address
    Given I go to the contact us page
	And I fill in "Email" with "email@example.com"
    When I press "Send"
    Then a student should exist with email: "email@example.com"
  
  Scenario: Duplicate email
    Given a student exists with email: "duplicate@example.com"
    And I go to the contact us page
	And I fill in "Email" with "duplicate@example.com"
    When I press "Send"
	Then 1 students should exist
  
  
  