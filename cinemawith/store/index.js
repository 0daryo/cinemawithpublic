export const strict = false;

import Vue from "Vue";
import Vuex from "Vuex";
import uuidv4 from "uuid";
import firebase from "../plugins/firebase";
import {
  firebaseMutations,
  firebaseAction
} from "vuexfire";
const googleProvider = new firebase.auth.GoogleAuthProvider()
Vue.use(Vuex);
const headers = {
  'Content-Type': "application/x-www-form-urlencoded",
  'Access-Control-Allow-Origin': '*',
}
const db = firebase.database();
const moviesRef = db.ref("/movies");
export const state = () => {
  return {
    movies: [],
    users: [],
    messages: [],
    roomNumber: null,
    user: null,
    friends: [],
    friend: null,
    chattingFriend: null,
    loginUser: null,
    myPic: null,
    profileUrls: [],
    profile: null,
    self: null,
    friendUrl: null,
    userInfo: null,
    errorMessage: null,
    infoMessage: null,
    movieKey: null,
    movie: null,
    favoriteMovie: null,
    message: null
  };
};

export const actions = {

  // -------------common
  setUserInfo: function (context) {
    const user = firebase.auth().currentUser;
    const userRef = db.ref("/users/" + user.uid);
    userRef.on("value", function (snapshot) {
      context.commit("setUserInfo", snapshot.val());
    })
    const urlRef = db.ref("/profile_urls/" + user.uid);
    urlRef.once("value", function (snapshot) {
      if (!snapshot.val()) {
        return
      }
      context.commit("setMyPic", snapshot.val().profileImageUrl);
    })
  },

  initFriends: firebaseAction(({
    bindFirebaseRef
  }, user) => {
    const userFriendSelect = db.ref("/users/" + user.uid + "/friends");
    bindFirebaseRef("friends", userFriendSelect, {
      wait: true
    });
  }),

  //search profiles
  initUrls: firebaseAction(async ({
    bindFirebaseRef
  }) => {
    const urlsRef = await db.ref("/profile_urls")
    await bindFirebaseRef("profileUrls", urlsRef, {
      wait: true
    });
  }),

  startChat: firebaseAction(({
    bindFirebaseRef
  }, user) => {
    const messagesRef = db.ref("/rooms/" + user.roomNumber);
    bindFirebaseRef("messages", messagesRef, {
      wait: true
    });
  }),

  setRead: firebaseAction((context) => {
    const read = {
      unRead: false
    }
    const user = context.state.loginUser;
    const friend = context.state.friend;
    const friendRef = db.ref("/users/" + user.uid + "/friends/" + friend.uid);
    friendRef.update(read);
  }),

  speak: firebaseAction((context, messageInfo) => {
    const user = firebase.auth().currentUser;
    const messagesRef = db.ref("/rooms/" + messageInfo.user.roomNumber);
    const userInfo = context.state.userInfo
    const data = {
      sender: user.uid,
      senderName: userInfo.nickName,
      text: messageInfo.text
    };
    messagesRef.push(data);
    const time = {
      unRead: false,
      currentTime: Date.now()
    }
    messagesRef.update(time);

    const friend = context.state.friend
    const userRef = db.ref("/users/" + user.uid + "/friends/" + friend.uid);
    userRef.update(time);
    const timeUnread = {
      currentTime: Date.now(),
      unRead: true
    }
    const friendRef = db.ref("/users/" + friend.uid + "/friends/" + user.uid);
    friendRef.update(timeUnread);
  }),

  //------------------movies
  //search movies
  searchFriends: function (context, {
    userMovieRef
  }) {
    userMovieRef.orderByChild("uid").once("value", function (snapshot) {
      context.commit("setUsers", snapshot.val());
    });
    const user = firebase.auth().currentUser;
    const selfRef = db.ref("/users/" + user.uid);
    selfRef.once("value", function (snapshot) {
      context.commit("setSelf", snapshot.val());
    })
  },
  initFavoriteMovie: function (context) {
    const favoriteMovieRef = db.ref("/favoriteMovie");
    favoriteMovieRef.once("value", function (snapshot) {
      console.log(snapshot.val())
      context.commit("setFavoriteMovie", snapshot.val());
    })
  },

  initMovies: firebaseAction(async ({
    bindFirebaseRef
  }) => {
    await bindFirebaseRef("movies", moviesRef, {
      wait: true
    });
  }),
  //register
  addUserToMovie: firebaseAction((context, key) => {
    const user = context.state.loginUser;
    const userMovieSelect = db.ref("/movies/" + key + "/users/" + user.uid);
    userMovieSelect
      .orderByChild("uid")
      .startAt(user.uid)
      .endAt(user.uid)
      .once("value", function (snapshot) {
        if (snapshot.val()) {
          context.commit("setErrorMessage", "already registered")
          return;
        }

        const userInfo = context.state.userInfo
        const data = {
          nickName: userInfo.nickName,
          url: context.state.myPic,
          age: userInfo.age,
          sex: userInfo.sex,
          pr: userInfo.pr,
          favorite: userInfo.favorite,
          uid: userInfo.uid
        }
        const userMovieRef = db.ref("/users/" + user.uid + "/movies/" + key);
        userMovieSelect.update(data);
        userMovieRef.push(key)
      });
  }),
  // 友達申請
  follow: async function (context, friend) {
    const user = firebase.auth().currentUser;
    const movieKey = context.state.movieKey;
    const userFriendSelect = db.ref("/users/" + user.uid + "/friends");

    if (user.uid == friend.uid) {
      context.commit("setErrorMessage", "yourself")
      return;
    }
    const self = context.state.self;
    userFriendSelect
      .orderByChild("uid")
      .startAt(friend.uid)
      .endAt(friend.uid)
      .once("value", function (snapshot) {
        if (snapshot.val()) {
          context.commit("setErrorMessage", "already friend")
          return;
        } else {
          const roomNumber = uuidv4();
          const friendData = {
            uid: friend.uid,
            nickName: friend.nickName,
            roomNumber: roomNumber,
            movieKey: movieKey
          };
          const userRef = db.ref("/users/" + user.uid + "/friends/" + friend.uid);
          userRef.update(friendData);

          const selfData = {
            uid: user.uid,
            nickName: self.nickName,
            roomNumber: roomNumber,
            movieKey: movieKey
          };

          const friendRef = db.ref("/users/" + friend.uid + "/friends/" + user.uid);
          friendRef.update(selfData);

          context.commit("setInfoMessage", "success")
        }
      });
  },

  seeUserInfo: function (context, user) {
    const usersRef = db.ref("/users/" + user.uid);
    usersRef.once(("value"), function (snapshot) {
      context.commit("setProfile", snapshot.val());
    })
    const friendUrlRef = db.ref("/profile_urls/" + user.uid);
    friendUrlRef.once("value", function (snapshot) {
      if (!snapshot.val()) {
        return
      }
      context.commit("setFriendUrl", snapshot.val().profileImageUrl);
    })
  },

  //ブロック
  blockUser: firebaseAction((context, user) => {
    console.log(user)
    const loginUser = context.getters.getLoginUser;
    const selfRef = db.ref(
      "users/" + loginUser.uid + "/friends/"
    );
    const friendRef = db.ref("users/" + user.uid + "/friends/");
    selfRef.orderByChild("uid")
      .startAt(user.uid)
      .endAt(user.uid)
      .once("value", function (snapshot) {
        const key = Object.keys(snapshot.val())
        selfRef.child(key[0]).remove();
      });

    friendRef.orderByChild("uid")
      .startAt(loginUser.uid)
      .endAt(loginUser.uid)
      .once("value", function (snapshot) {
        const key = Object.keys(snapshot.val())
        friendRef.child(key[0]).remove();
      });
  }),

  // ----------------mypage

  deleteInfo: function (context) {
    const user = context.state.loginUser;
    const userRef = db.ref("/users/" + user.uid);
    const data = {
      isDeleted: true,
      movies: []
    }
    const movies = context.state.movies;
    movies.forEach((val, index, array) => {
      const deleteUserRef = moviesRef.child(val[".key"]).child("users").child(user.uid);
      deleteUserRef.remove();
    })
    userRef.update(data);
  },

  setMyPic: function (context) {
    const user = context.state.loginUser;
    const userUrlSelect = db.ref("/profile_urls/" + user.uid);
    userUrlSelect.once("value", function (snapshot) {
      context.commit("setMyPic", snapshot.val());
    });
  },

  login() {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithRedirect(googleProvider)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  },
  setLoginUser({
    commit
  }, payload) {
    commit('setLoginUser', payload)
  },

  logout({
    commit
  }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit('setLoginUser', null)
          resolve()
        })
    })
  },

  // -------------------登録ページ

  createUser: async function (context, data) {
    const user = context.state.loginUser;
    const usersRef = db.ref("/users/" + user.uid);
    usersRef.update(data);
    // await axios({
    //   method: "GET",
    //   url: 'https://us-central1-cinemawith-eb960.cloudfunctions.net/getLocation',
    //   headers: headers
    // }).then((res => {
    //   console.log(res)
    // }))
  },

  // ---------------------チャット
  setMovie: function (context) {
    const movieKey = context.state.friend.movieKey;
    console.log(movieKey)
    const movieSelect = db.ref("/movies/" + movieKey);
    movieSelect.once("value", function (snapshot) {
      context.commit("setMovie", snapshot.val());
    });
  },

  setMessage: function (context) {
    const messageRef = db.ref("/message/");
    messageRef.once(("value"), function (snapshot) {
      context.commit("setMessage", snapshot.val());
    })
  }

};

//getters
export const getters = {
  getMovies: state => {
    return state.movies;
  },
  getUsers: state => {
    return state.users;
  },
  getFriends: state => {
    return state.friends;
  },
  getMessages: state => {
    return state.messages;
  },
  getLoginUser: state => {
    return state.loginUser;
  },
  isAuthenticated(state) {
    return !!state.loginUser
  },
  getProfile(state) {
    return state.profile
  },
  getMyPic: state => {
    return state.myPic
  },
};

// mutations
export const mutations = {
  setUsers: function (state, users) {
    state.users = users;
  },
  setLoginUser: function (state, loginUser) {
    state.loginUser = loginUser;
  },
  setMyPic: function (state, myPic) {
    state.myPic = myPic;
  },
  setProfile: function (state, profile) {
    state.profile = profile;
  },
  setSelf: function (state, self) {
    state.self = self;
  },
  setFriendUrl: function (state, url) {
    state.friendUrl = url;
  },
  setUserInfo: function (state, userInfo) {
    state.userInfo = userInfo;
  },
  setFriend: function (state, friend) {
    state.friend = friend;
  },
  setErrorMessage: function (state, message) {
    state.errorMessage = message;
  },
  setInfoMessage: function (state, message) {
    state.infoMessage = message;
  },
  setMovieKey: function (state, movieKey) {
    state.movieKey = movieKey;
  },
  setMovie: function (state, movie) {
    state.movie = movie;
  },
  setFavoriteMovie: function (state, favoriteMovie) {
    state.favoriteMovie = favoriteMovie;
  },
  setMessage: function (state, message) {
    state.message = message;
  },
  ...firebaseMutations
};
