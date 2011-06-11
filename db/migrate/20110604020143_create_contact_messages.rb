class CreateContactMessages < ActiveRecord::Migration
  def self.up
    create_table :contact_messages do |t|
      t.string :email
      t.string :subject
      t.text :body

      t.timestamps
    end
  end

  def self.down
    drop_table :contact_messages
  end
end
