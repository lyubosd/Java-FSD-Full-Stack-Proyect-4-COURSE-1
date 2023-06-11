const username = document.getElementById('username');
const saveScore = document.getElementById('saveScore');
const finalScore = document.getElementById('finalScore');
const RecentScore = localStorage.getItem('RecentScore');
finalScore.innerText = "Points: "+RecentScore+ " points!";

username.addEventListener('keyup', () => {
    saveScore.disabled = !username.value;
});

saveHigherScore = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username.value);
};

window.onload = function(){
    username.value =  localStorage.getItem("username");
  } 