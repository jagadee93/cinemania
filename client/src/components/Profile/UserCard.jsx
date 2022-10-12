

import React from 'react'

function UserCard() {
  return (
    <div class="wrapper">
    <div class="clash-card barbarian">
      <div class="clash-card__image clash-card__image--barbarian">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png" alt="barbarian" />
      </div>
      <div class="clash-card__level clash-card__level--barbarian">Critic</div>
      <div class="clash-card__unit-name">name</div>
      <div class="clash-card__unit-description">
        email:@gmail.com
      </div>
      <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
        <div class="one-third">
          <div class="stat">5<sup>S</sup></div>
          <div class="stat-value">Reviews</div>
        </div>
        <div class="one-third">
          <div class="stat">10</div>
          <div class="stat-value">addedmovies</div>
        </div>
        <div class="one-third no-border">
          <button>delete user</button>
        </div>
      </div>

    </div> 
  </div> 
  
  )
}

export default UserCard








