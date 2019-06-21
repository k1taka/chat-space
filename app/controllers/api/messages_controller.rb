class Api::MessagesController < ApplicationController

  def index
    @messages = @group.messages.includes(:user).where.not()
  end
end


