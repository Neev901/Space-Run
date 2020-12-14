var canvas;
var bg;
var player, player_img;
var bg_sprite, bg2;
var fb1, fb2, fb3, fb4;
var game_over, go_img;
var game_won, won_img;
var rock_img;
var light_obs, obs_img;
var fireballs, rocks, obstacles;
var player_lives = 5;
var points = 0;
var lives_text;
var life_0, life_1, life_2, life_3, life_4, life_5;
var points_text;
var point_0, point_1, point_2, point_3, point_4, point_5;
var coins, coin_img;
var instruct_1, instruct_2;
var img_1, img_2;
var left_img, right_img, left, right;
var pa_img, play_again;

function preload() {
  bg = loadImage("./Images/bg2.jpg")
  player_img = loadImage("./Images/download.png")
  bg2 = loadImage("./Images/bg2.jpg")
  fb1 = loadImage("./Images/fireball(1).png")
  fb2 = loadImage("./Images/fireball(2).png")
  fb3 = loadImage("./Images/fireball(3).png")
  fb4 = loadImage("./Images/fireball(4).png")
  obs_img = loadImage("./Images/obstacle.jpg")
  go_img = loadImage("./Images/game-over.jpg")
  rock_img = loadImage("./Images/rock.gif")
  life_0 = loadImage("./Images/0.png")
  life_1 = loadImage("./Images/1.png")
  life_2 = loadImage("./Images/2.png")
  life_3 = loadImage("./Images/3.png")
  life_4 = loadImage("./Images/4.png")
  life_5 = loadImage("./Images/5.png")
  coin_img = loadImage("./Images/coin.png")
  point_0 = loadImage("./Images/p0.png")
  point_1 = loadImage("./Images/p1.png")
  point_2 = loadImage("./Images/p2.png")
  point_3 = loadImage("./Images/p3.png")
  point_4 = loadImage("./Images/p4.png")
  point_5 = loadImage("./Images/p5.png")
  won_img = loadImage("./Images/won!.png")
  img_1 = loadImage("./Images/instruct1.png")
  img_2 = loadImage("./Images/instruct2.png")
  left_img = loadImage("./Images/left.png")
  right_img = loadImage("./Images/right.png")
  pa_img = loadImage("./Images/playAgainButton.png")
}


function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 160)
  bg_sprite = createSprite(((displayWidth - 20) / 2), ((displayHeight - 300)))
  bg_sprite.addImage("bg2", bg)
  bg_sprite.scale = 1.5;
  player = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  player.addImage("img", player_img)
  fireballs = new Group()
  rocks = new Group()
  obstacles = new Group()
  coins = new Group()
  lives_text = createSprite(((displayWidth - 1500) / 2), (displayHeight - 600))
  lives_text.addImage("5", life_5);
  lives_text.scale = 1
  points_text = createSprite(((displayWidth + 1500) / 2), (displayHeight - 600))
  points_text.addImage("p0", point_0);
  points_text.scale = 1
  game_over = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  game_over.addImage("img", go_img);
  game_over.visible = false;
  game_won = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  game_won.addImage("won_img", won_img);
  game_won.visible = false;
  instruct_1 = createSprite(((displayWidth - 20) / 2), (displayHeight))
  instruct_1.addImage("img-1", img_1)
  instruct_2 = createSprite(((displayWidth - 20) / 2), (displayHeight + 100))
  instruct_2.addImage("img-2", img_2)
  left = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  left.addImage("left", left_img)
  left.visible = false;
  right = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  right.addImage("right", right_img)
  right.visible = false;
  play_again = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  play_again.addImage("btn", pa_img)
  play_again.visible = false;
}


function draw() {
  background("white")
  camera.position.x = player.x;
  camera.position.y = player.y;
  lives_text.x = camera.position.x - 750
  points_text.x = camera.position.x + 750
  instruct_1.x = camera.position.x;
  instruct_2.x = camera.position.x;
  if (player_lives > 0 && points < 25) {
    bg_sprite.velocityY = 2
    if (bg_sprite.y > (displayHeight - 50)) {
      bg_sprite.y = ((displayHeight - 300))
    }

    if (keyWentDown(LEFT_ARROW) && camera.position.x > 450) {
      player.x -= 50;
    }
    if (keyWentDown(LEFT_ARROW) && camera.position.x == 450) {
      left.visible = true;
      left.x = camera.position.x;
      setTimeout(function () {
        left.visible = false;
      }, 1000)
    }
    if (keyWentDown(RIGHT_ARROW) && camera.position.x < 1400) {
      player.x += 50;
    }
    if (keyWentDown(RIGHT_ARROW) && camera.position.x == 1400) {
      right.visible = true
      right.x = camera.position.x;
      setTimeout(function () {
        right.visible = false
      }, 1000)
    }


    if (obstacles.isTouching(player)) {
      deduct_life()
    }

    if (rocks.isTouching(player)) {
      deduct_life()
    }

    if (fireballs.isTouching(player)) {
      deduct_life()
    }

    if (coins.isTouching(player)) {
      increase_points();
    }

    CreateObs();
    CreateRock();
    CreateFireball();
    CreateCoin();
  }

  if (mousePressedOver(play_again)) {
    points = 0
    player_lives = 5;
    play_again.visible = false
    game_over.visible = false
    game_won.visible = false
    lives_text.changeImage("5")
    points_text.changeImage("p0")
  }

  drawSprites();
  textSize(200)
  fill("black")
  text(500, 500, "Dodge the obstacles")
}

function CreateFireball() {
  if (frameCount % 300 == 0) {
    var fireball = createSprite(camera.x, camera.y - (displayHeight / 2 + 10))
    fireball.addAnimation("fb_anime", fb1, fb2, fb3, fb4);
    fireball.velocityY = 15.5
    fireball.scale = 0.7;
    fireball.lifetime = 65
    fireballs.add(fireball)
  }
}

function CreateRock() {
  if (frameCount % 215 == 0) {
    var r = random(-55, 55)
    var rock = createSprite((player.x + r), camera.y - (displayHeight / 2 + 10))
    rock.addImage("img", rock_img);
    rock.velocityY = 7
    rock.scale = 0.5;
    rock.lifetime = 135
    rocks.add(rock)
  }
}

function CreateObs() {
  if (frameCount % 135 == 0) {
    var r = random(-125, 35)
    var obstacle = createSprite(camera.x + r, camera.y - (displayHeight / 2 + 10))
    obstacle.addImage("img", obs_img);
    obstacle.velocityY = 7
    obstacle.scale = 0.5;
    obstacle.lifetime = 135
    obstacles.add(obstacle)
  }
}

function CreateCoin() {
  if (frameCount % 500 == 0) {
    var r = random(-125, 125)
    var coin = createSprite(camera.x + r, camera.y - (displayHeight / 2 + 10))
    coin.addImage("coin", coin_img);
    coin.velocityY = 7
    coin.scale = 0.5;
    coin.lifetime = 135
    coins.add(coin)
  }
}

function deduct_life() {
  if (player_lives > 0) {
    player_lives -= 1;
    fireballs.destroyEach();
    rocks.destroyEach();
    obstacles.destroyEach();
    if (player_lives == 4) {
      lives_text.addImage("4", life_4)
      lives_text.changeImage("4")
    }
    else if (player_lives == 3) {
      lives_text.addImage("3", life_3)
      lives_text.changeImage("3")
    }
    else if (player_lives == 2) {
      lives_text.addImage("2", life_2)
      lives_text.changeImage("2")
    }
    else if (player_lives == 1) {
      lives_text.addImage("1", life_1)
      lives_text.changeImage("1")
    }
    else {
      lives_text.addImage("0", life_0)
      lives_text.changeImage("0")
    }
  }
  if (player_lives == 0) {
    bg_sprite.x = ((displayWidth - 20) / 2)
    bg_sprite.y = ((displayHeight - 300))
    bg_sprite.velocityY = 0;
    game_over.visible = true;
    game_over.x = camera.position.x;
    game_over.y = camera.position.y;
    play_again.visible = true;
    play_again.x = camera.position.x;
    play_again.y = camera.position.y - 300;
  }
}

function increase_points() {
  points += 5;
  coins.destroyEach();
  if (points == 5) {
    points_text.addImage("p1", point_1)
    points_text.changeImage("p1")
  }
  else if (points == 10) {
    points_text.addImage("p2", point_2)
    points_text.changeImage("p2")
  }
  else if (points == 15) {
    points_text.addImage("p3", point_3)
    points_text.changeImage("p3")
  }
  else if (points == 20) {
    points_text.addImage("p4", point_4)
    points_text.changeImage("p4")
  }
  else if (points == 25) {
    points_text.addImage("p5", point_5)
    points_text.changeImage("p5")
    fireballs.destroyEach();
    rocks.destroyEach();
    obstacles.destroyEach();
    game_won.visible = true
    game_won.x = camera.position.x;
    game_won.y = camera.position.y;
    bg_sprite.x = ((displayWidth - 20) / 2)
    bg_sprite.y = ((displayHeight - 300))
    bg_sprite.velocityY = 0;
    play_again.visible = true;
    play_again.x = camera.position.x;
    play_again.y = camera.position.y - 300;
  }
}