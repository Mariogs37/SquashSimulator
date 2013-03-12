module ApplicationHelper
  def intellinav
    if @auth.present?
      link_to(@auth.email, login_path, :method => :delete, :class => 'button')
    else
      link_to('Login', login_path, :class => 'button')
    end
  end
end
