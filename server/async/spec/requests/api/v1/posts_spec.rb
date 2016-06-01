require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do
  let(:valid_attributes){
    {
      post: {
        title: "Why is Redux so hard to understand?"
      }
    }
  }
  before{ Post.delete_all }

  describe "index" do
    it "returns all posts" do
      3.times{ Post.create!(title: "test") }
      get api_v1_posts_path
      json = JSON.parse(response.body)
      expect(json.size).to eq 3
    end
  end
  describe "create" do
    it "creates a new post" do
      post api_v1_posts_path(valid_attributes)
      expect(Post.one?).to be_truthy
      post = Post.first
      expect(post.title).to eq("Why is Redux so hard to understand?")
    end
  end
  describe "update" do
    before{ Post.create!(title: "do the laundry") }
    it "updates post title" do
      patch api_v1_post_path(Post.first, {post: {title: "do the dishes"}})
      expect(Post.first.title).to eq("do the dishes")
    end
  end

end
