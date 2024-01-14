function authenticateUser() {
  const username = prompt("Enter your username:");
  if (username) {
    localStorage.setItem("username", username);
    updateUserInfo();
  }
}

function updateUserInfo() {
  const userInfoContainer = document.getElementById("user-info");
  const username = localStorage.getItem("username");
  if (username) {
    userInfoContainer.innerHTML = `Welcome, ${username}! <button onclick="logout()">Logout</button>`;
  } else {
    userInfoContainer.innerHTML =
      '<button onclick="authenticateUser()">Log In/Sign Up</button>';
  }
}

function logout() {
  localStorage.removeItem("username");
  updateUserInfo();
}

// Initialize user info
updateUserInfo();

function addLike(postElement) {
  const likeCountElement = postElement.querySelector(".like-count");
  let likeCount = parseInt(likeCountElement.textContent) || 0;
  likeCount++;
  likeCountElement.textContent =
    likeCount + (likeCount === 1 ? " Like" : " Likes");
}

function addComment(postElement) {
  const commentText = prompt("Enter your comment:");
  if (commentText) {
    const commentList = postElement.querySelector(".comments");
    const commentElement = document.createElement("li");
    commentElement.textContent = `${
      localStorage.getItem("username") || "Guest"
    }: ${commentText}`;
    commentList.appendChild(commentElement);
  }
}

function addPost() {
  const postText = document.getElementById("post-text").value;
  const postImage = document.getElementById("post-image").files[0];

  if (postText.trim() === "" && !postImage) {
    alert("Please enter a post or upload an image before submitting.");
    return;
  }

  const postsContainer = document.getElementById("posts");
  const postElement = document.createElement("li");
  postElement.className = "post";

  const username = localStorage.getItem("username") || "Guest";

  // Add user info to post
  const userElement = document.createElement("p");
  userElement.className = "user-info";
  userElement.textContent = `Posted by ${username} on ${getCurrentTimestamp()}`;
  postElement.appendChild(userElement);

  if (postText.trim() !== "") {
    const textElement = document.createElement("p");
    textElement.textContent = postText;
    postElement.appendChild(textElement);
  }

  if (postImage) {
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(postImage);
    postElement.appendChild(imgElement);
  }

  // Like button
  const likeCountElement = document.createElement("span");
  likeCountElement.className = "like-count";
  postElement.appendChild(likeCountElement);

  const likeButton = document.createElement("button");
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", () => addLike(postElement));
  postElement.appendChild(likeButton);

  // Comment button
  const commentButton = document.createElement("button");
  commentButton.textContent = "Comment";
  commentButton.addEventListener("click", () => addComment(postElement));
  postElement.appendChild(commentButton);

  // Comments list
  const commentsList = document.createElement("ul");
  commentsList.className = "comments";
  postElement.appendChild(commentsList);

  postsContainer.prepend(postElement);

  // Clear the input fields
  document.getElementById("post-text").value = "";
  document.getElementById("post-image").value = "";
}

function getCurrentTimestamp() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return now.toLocaleDateString(undefined, options);
}
