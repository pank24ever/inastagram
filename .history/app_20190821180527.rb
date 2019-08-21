require 'sinatra'
require 'sinatra/reloader'
require 'erb'
require 'pg'
require 'sinatra/cookies'
require 'pry'
require 'fileutils'
require 'json'

enable :sessions
# set :environment, :production

connection = PG::connect(
  :host => "localhost",
  :user => "pank24ever",
  :password => "",
  :dbname => "test_db",
  :port => 5432
)

#sessionが切れていたら、loginさせるメソッド
def check_login
  redirect '/login' unless session[:user_id] 
end

#初期画面(新規登録 or ログイン画面)
get '/' do
  erb :index,layout: nil
end

#ログイン画面
get '/login' do
  session[:email] = params['email']
  session[:password] = params['password']
  erb :login,layout: nil
end

post '/login' do
  @title = "LOGIN"
  email = params['email']
  password = params['password']
  id = connection.exec("select id from users where email = $1 and password = $2",[email,password]).first
  if id
    session[:user_id] = id['id']
    redirect '/timeline'
  else
    redirect '/login' #erbにしたら、入力したデータが初期化してしまう
  end
end

#新規登録画面(メアド、パスワード)
get '/signup1' do 
  @title = "SIGNUP"
  email = params['email']
  password = params['password']
  erb :signup1,layout: nil
end

post '/signup1' do
  session[:email] = params['email']
  session[:password] = params['password']
  res = connection.exec("select * from users where email = $1 and password = $2",[session[:email],session[:password]]).first
  unless res
    connection.exec("insert into users (email,password) values ($1,$2)",[session[:email],session[:password]])
    id = connection.exec("select id from users where email = $1 and password = $2",[session[:email],session[:password]]).first
    redirect '/signup/' + id['id']
  else
    redirect '/signup1'
  end
end

#新規登録画面(プロフィール画像、名前、ユーザーネーム)
get '/signup/:id' do
  @title = "SIGNUP"
  #ルートのid指定するために、paramsで取得！formタグのみではないらしい
  #次回、paramsの詳しい使い方を聞く！
  @user_id = params['id'] #変数は、erbファイルで使うため格納
  erb :signup2,layout: nil
end

post '/signup/:id' do
  name = params['name']
  user_name = params['user_name']
  plofile_img = params[:plofile_img][:filename]
  id = params['id']

  FileUtils.mv(params[:plofile_img][:tempfile],"./public/plofile_img/#{plofile_img}") 

  res = connection.exec('select * from users where plofile_img = $1 and name = $2 and user_name = $3',[plofile_img,name,user_name]).first
  unless res
    #ちゃんとwhereで場所を指定してあげないと、全てのデータがアップデートされる
    connection.exec('update users set plofile_img = $1,name = $2,user_name = $3 where id = $4',[plofile_img,name,user_name,id])
    redirect '/login'
  else
    redirect '/signup1'
  end
end

#ログアウト画面
get '/logout' do
    session[:user_id] = nil
    redirect '/'
end

#タイムライン(フォローしている人の画像、自分の投稿した画像が見れる)
get '/timeline' do
  check_login
  @title = "TIME LINE"
  @posts = connection.exec('select * from post inner join users on post.user_id = users.id where post.id = $1 order by post.id desc',[params['post_id']])
  #where で指定してみたんですけどうまく行かなかったです

  erb :timeline
end

#投稿画面(タイトル、コンテンツ、画像 )
get '/post' do
  erb :post
end

post '/post' do
  check_login
  user_id = session[:user_id] #user_idは何を示しているのか？
  title = params['title']
  contents = params['contents']
  @file = params['img']['filename']

  FileUtils.mv(params['img']['tempfile'],"./public/images/#{@file}") 
  
  connection.exec('insert into post(title,contents,user_id,img) 
  values($1,$2,$3,$4)',[title,contents,user_id,@file])
  redirect '/timeline'
end

#削除画面
get '/delete/:id' do
  connection.exec('delete from post where id = $1',[params['id']])
  redirect '/timeline'
end 

#Plofile画面
get '/plofile' do
  check_login
  @user_id = session[:user_id]
  @users = connection.exec('select * from users where id = $1',[@user_id]).first

  @user_posts = connection.exec('select * from post where user_id = $1 order by id desc',[@user_id])
  erb :plofile
end

#プロフィールを編集する
get '/edit_plofile/:id' do
  check_login
  @user_id = session[:user_id]
  @users = connection.exec('select * from users where id = $1',[@user_id]).first
  erb :edit_plofile,layout: nil
end

post '/edit_plofile/:id' do
  plofile_img = params['plofile_img']['filename']
  name = params['name']
  user_name = params['user_name']
  introduction = params['introduction']
  id = params['id']

  FileUtils.mv(params['plofile_img']['tempfile'],"./public/plofile_img/#{plofile_img}")

  connection.exec('update users set plofile_img = $1,name = $2,user_name = $3,plofile_contents = $4 where id = $5',[plofile_img,name,user_name,introduction,id])

  redirect '/plofile'
end

#Likeする
get '/like/:post_id' do
  check_login
  # 下のsql文の.firstつけた。：ヤブ
  post_id = connection.exec('select * from "like" where user_id = $1 and post_id = $2',[session[:user_id],params[:post_id]]).first
  puts post_id
  unless post_id  #LIKEテーブルにいいねしている情報がなければ、いいね押すことができる
    connection.exec('insert into "like"(user_id,post_id) values($1,$2)',[session[:user_id],params[:post_id]])
    content_type :json
    @data = {"a" => 1,"b" => 2}
    puts "insertします"
  else #LIKEテーブルにすでに情報があればいいねを外す
    connection.exec('delete from "like" where user_id = $1 and post_id = $2',[session[:user_id],params[:post_id]])
    content_type :json
    @data = {"a" => 1,"b" => 2}
    puts "deleteします"
  end
end

# やぶ
# puts post_idしてみてもいい？
# likeある投稿、ない投稿でアクセスしてもらえるとログからどんな動作してるか見れそうな予感。
# なるほど笑なんかそこはajaxでどうにかできそうだから、一旦後回しかもしれないね
# 何だろう、、、通ってない？もう一回！セーブしてみた
# 

#たぶんpostidの部分にuseridが入っているっぽいです

# get '/unlike/:post_id' do
#   check_login
  
# end

#ユーザー検索
get '/search' do

end

#Like一覧(今までLIKEした投稿の一覧を見ることができる)
get '/like_list' do
  check_login
  # @like = connection.exec('select * from "like" where user_id = $1',[session[:id]])

  @likes = connection.exec('select * from "like" inner join post on "like".post_id = post.id where "like".user_id = $1 order by post.id desc',[session[:user_id]])
  erb :like_list
end 

#相手のプロフィールを表示する
get '/show_your_plofile/:id' do
  check_login
  if params['id'] == session[:user_id]
    redirect '/plofile'
  else
    @your_plofile = connection.exec('select * from users where id = $1',[params['id']]).first

    @your_posts = connection.exec('select * from post where user_id = $1 order by id desc',[params['id']])
    erb :show_your_plofile
  end
end

#followする
#非同期で行いたい
get '/follow/:user_id' do
  check_login
  connection.exec('insert into follow(following_id,followed_id) values($1,$2)',[session[:user_id],params['user_id']])

end

#followを外す
get '/unfollow/:user_id' do
  check_login
  connection.exec('delete from follow where following_id = $1 and followed_id = $2',[session[:user_id],params['user_id']])
end