var path, user, pageStats, averageRating, haveUpdatedStats;

// register our handler to iframes that deal with auth,
// and communicate with parent frame to show/hide toolbar
window.addEventListener("message", handleMessage, false);

// structure is base/page/user.uid = 7.0
// base/page/stats = {sum: 40, count: 14}
var firebase = new Firebase('https://pagerate.firebaseio.com/');
$(document).ready(function() {
  // kick things off by getting the parent frame path.
  // we could also do this by passing it in the hash of the url.
  top.postMessage('getPageRankPath', '*');
  // we also need the user to login to show average rating + let them rate.
  var loginFunc = function() {
    var w = $('#authFrame')[0].contentWindow;
    w.postMessage('getAuthToken', '*');
  };

  loginFunc();
  $('#login-btn').click(loginFunc);

  // honestly I think I'd prefer to utilize the chrome extension
  // popup option. That would also simplify all this iframe messaging
  // and these xss workarounds.
  // make hide button hide iframe.
  $('#hide-btn').click(hide);

});

function rate(rank) {
  if (user && path) {
    // TODO(ted) make sure only logged in users can update.
    // update user rating
    var userPageRef = firebase.child(path).child(user.uid);
    userPageRef.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        userPageRef.transaction(function(currentValue) {
          if (currentValue === null) {
            // update stats
            updateStats(rank);
            return rank;
          } 
        });
      }
    });
  }
}

function updateStats(rank) {
  // only want to do this once - since the above is a transaction
  // it could potentially trigger multiple times.
  if (haveUpdatedStats) {
    return;
  }
  // update our aggregates.
  var pageStatsRef = firebase.child(path).child('stats')
  pageStatsRef.transaction(function(current_value) {
    haveUpdatedStats = true;
    var sumRank, sumCount;
    if (current_value === null) {
      sumRank = rank;
      sumCount = 1;
    } else {
      sumRank = current_value['sum'] + rank;
      sumCount = current_value['count'] + 1;
    }
    //TODO update dom to show the rank an new average.
    return {'sum': sumRank, 'count': sumCount};
  });
}

function getPageStats() {
  // call to firebase to compute average rank for ${path}
  if (path) {
    var pageStatsRef = firebase.child(path).child('stats')
    pageStatsRef.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        // no stats yet. Show unrated.
        averageRating = 'UNRATED';
      } else {
        pageStats = snapshot.val();
        averageRating = (pageStats.sum / pageStats.count).toFixed(2);
      }
    });
  }
}

function maybeHideFrame() {
  if (user && path) {
    var userPageRef = firebase.child(path).child(user.uid);
    userPageRef.once('value', function(snapshot) {
      if(snapshot.val() === null) {
        // page is not rated;
      } else {
        var rating = snapshot.val();
        // for now we hide.
        hide();
      }
    });
  }
  return false;
}

function hide() {
  top.postMessage('hidePageRankFrame', '*');
}

function handleMessage(event) {
  if (event.data.hasOwnProperty('returnPageRankPath')) {
    var truePath = event.data['returnPageRankPath'];
    path = encodeURIComponent(truePath).replace(/\./g, '%2E')
    // now that we loaded the path, kick off computation of average rating.
    getPageStats();
    maybeHideFrame();
  } else if (event.data.hasOwnProperty('fireBaseAuthCompleted')) {
    var localUser = event.data['fireBaseAuthCompleted'];
    if (!localUser) {
      return;
    }

    // login was succesful!
    $('#login-btn').hide();
    var userId = localUser.uid;
    var firebaseAuthToken = localUser.firebaseAuthToken;
    //Log user in
    firebase.auth(firebaseAuthToken, function(error, result) {
    if(error) {
      console.log("Login Failed!", error);
    } else {
      user = localUser;
      console.log('Authenticated successfully with payload:', result.auth);
      //maybeHideFrame();
    }

    $('#rate-input').mouseup(function(event) {
      rate($(event.target).val());
    });
});
  }
}
