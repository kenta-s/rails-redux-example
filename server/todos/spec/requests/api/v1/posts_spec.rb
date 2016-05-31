require 'rails_helper'

RSpec.describe "Api::V1::Events", type: :request do
  let(:valid_attributes){
    {
      todo: {
        name: "do the laundry",
        status: "active"
      }
    }
  }
  before{ Todo.delete_all }

  describe "index" do
    it "returns all todos" do
      3.times{ Todo.create!(name: "test") }
      get api_v1_todos_path
      json = JSON.parse(response.body)
      expect(json.size).to eq 3
    end
  end
  describe "create" do
    it "creates a new todo" do
      post api_v1_todos_path(valid_attributes)
      expect(Todo.one?).to be_truthy
      todo = Todo.first
      expect(todo.active?).to be_truthy
      expect(todo.name).to eq("do the laundry")
    end
  end
  describe "update" do
    before{ Todo.create!(name: "do the laundry", status: "active") }
    it "updates todo name" do
      patch api_v1_todo_path(Todo.first, {todo: {name: "do the dishes"}})
      expect(Todo.first.name).to eq("do the dishes")
    end
    it "updates todo status" do
      patch api_v1_todo_path(Todo.first, {todo: {status: "completed"}})
      expect(Todo.first.completed?).to be_truthy
    end
  end

end
