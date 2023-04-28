<template>
  <div class="wrapper">
    <div class="left">
      <div class="main">
        <h3>Restaurant List</h3>

        <form class="form">
          <input class="input" v-model="name" type="text" name="name" placeholder="Enter Restaurant" />
          <br />
          <input class="input" v-model="cuisine" type="text" name="cuisine" placeholder="Enter Cuisine" />
          <br />
          <select class="input" v-model.number="price" name="price" placeholder="Enter Price">
            <option>$$$$</option>
            <option>$$$</option>
            <option>$$</option>
            <option>$</option>
          </select>
          <br />
          <button class="submit-button" @click="addRestaurant">Add Restaurant</button>
        </form>
        <div class="todo-container">
          <ul>
            <li v-for="(restaurant, i) in restaurants" :key="restaurant._id">
              <div class="todo">
                <span class="todo-name">{{ restaurant.name }}</span>
                <span class="todo-description">{{ restaurant.cuisine }}</span>
                <span class="todo-description">{{ restaurant.price }}</span>
              </div>
              <button class="review-btn" @click="removeRestaurant(restaurant, i)">Add Review</button>
              <div class="review-form">
                <form>
                  <input class="input" v-model="user" type="text" name="user" placeholder="Enter User" />
                  <br />
                  <input class="input" v-model="review" type="text" name="review" placeholder="Enter Review" />
                  <br />
                  <select class="input" v-model.number="rating" name="rating" placeholder="Enter Rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                  <br />
                  <button class="submit-button" @click="addReview(restaurant)">Add Review</button>
                </form>
              </div>
              <button class="delete-btn" @click="removeRestaurant(restaurant, i)">DELETE</button>
              <ul>
                <li v-for="(review) in reviews" :key="review._id">
                  <div class="review">
                    <span class="review-name">{{ review.name }}</span>
                    <span class="review-description">{{ review.review }}</span>
                    <span class="review-description">{{ review.rating }}</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <span>Number of restaurants: {{ getNumberOfRestaurants() }}</span>
      <br>
      <span>Number of Cheap Eats: {{ getNumberOfCheap() }}</span>
      <h3>Contact Us!</h3>
      <form>
        <input class="input" v-model="comment" type="text" name="comment" placeholder="Leave a Comment!" />
        <br />
        <button class="submit-button" @click="addComment">Search</button>
      </form>
    </div>
    <div class="right">
      <GMap />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      restaurants: [],
      name: "",
      cuisine: "",
      price: "",
      user: "",
      review: "",
      rating: null,
      comment: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/RestaurantList/");
    this.restaurants = response.data;
  },
  methods: {
    async addRestaurant(e) {
      e.preventDefault();
      if (this.name === '' || this.cuisine === '' || this.price === '') {
        alert('Form is incomplete. Please fill out every field.')
        return
      }
      const response = await axios.post("api/RestaurantList/", {
        name: this.name,
        cuisine: this.cuisine,
        price: this.price,
      });
      this.restaurants.push(response.data);
      this.name = "";
      this.cuisine = "";
      this.price = "";
    },
    async removeRestaurant(item, i) {
      await axios.delete("api/RestaurantList/" + item._id);
      this.restaurants.splice(i, 1);
    },
    async addReview(restaurant) {
      restaurant.preventDefault();
      if (this.user === '' || this.review === '' || this.rating === null) {
        alert('Form is incomplete. Please fill out every field.')
        return
      }
      const response = await axios.post("api/RestaurantList/" + restaurant._id + "/reviews", {
        name: this.user,
        review: this.review,
        rating: this.rating,
      });
      this.reviews.push(response.data);
      this.user = "";
      this.review = "";
      this.rating = "";
    },
    async addComment(e) {
      e.preventDefault();
      if (this.comment === '') {
        alert('Form is incomplete. Please fill out every field.')
        return
      }
      const response = await axios.post("api/RestaurantList/contact", {
        suggestion: this.comment,
      });
      response.data;
      this.comment = "";
    },
    getNumberOfRestaurants() {
      return this.restaurants.reduce(sum => sum + 1, 0);
    },
    getNumberOfCheap() {
      return this.restaurants.reduce((sum, restaurant) => {
        if (restaurant.price === "$") {
          return sum + 1;
        }
        return sum;
      }, 0);
    },
  }
};
</script>

<style>
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 600px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.submit-button {
  width: 400px;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.todo-description {
  max-width: 70%;
  font-size: 14px;
}

.review-btn {
  background-color: #1976d2;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  background-color: antiquewhite;
}

.left {
  width: 50%;
  height: 100vh;
}

.right {
  width: 50%;
  height: 100vh;
}

.review-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}
</style>

