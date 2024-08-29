const users = [
    { username: 'voter1', password: 'password123' },
    { username: 'voter2', password: 'password456' }
];

let loggedInUser = null;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        loggedInUser = user;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('votingSection').style.display = 'block';
    } else {
        alert('Invalid username or password.');
    }
});
// Object to store vote counts
let votes = {
    Python: 0,
    JavaScript: 0,
    Java: 0,
    Cplusplus: 0
};

let voteHistory = {};  // Tracks who has voted

// Function to handle form submission
document.getElementById('votingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (voteHistory[loggedInUser.username]) {
        alert('You have already voted.');
        return;
    }

    // Get the selected vote
    const vote = document.querySelector('input[name="vote"]:checked').value;

    // Increment the vote count
    votes[vote]++;
    voteHistory[loggedInUser.username] = vote;

    // Update the results on the page
    document.getElementById('pythonVotes').innerText = votes.Python;
    document.getElementById('jsVotes').innerText = votes.JavaScript;
    document.getElementById('javaVotes').innerText = votes.Java;
    document.getElementById('cppVotes').innerText = votes.Cplusplus;
    
    // Reset the form
    document.getElementById('votingForm').reset();
});
let auditTrail = [];  // Log each vote with timestamp

document.getElementById('votingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (voteHistory[loggedInUser.username]) {
        alert('You have already voted.');
        return;
    }

    const vote = document.querySelector('input[name="vote"]:checked').value;
    votes[vote]++;
    voteHistory[loggedInUser.username] = vote;

    // Log the vote
    const timestamp = new Date().toISOString();
    auditTrail.push({ voter: loggedInUser.username, vote, timestamp });
    console.log(auditTrail);  // In a real system, this would be stored in a database

    document.getElementById('pythonVotes').innerText = votes.Python;
    document.getElementById('jsVotes').innerText = votes.JavaScript;
    document.getElementById('javaVotes').innerText = votes.Java;
    document.getElementById('cppVotes').innerText = votes.Cplusplus;
    
    document.getElementById('votingForm').reset();
});
auditTrail.push({ vote, timestamp });
