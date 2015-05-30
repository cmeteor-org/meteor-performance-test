meteorDown.init(function (Meteor) {
  Meteor.subscribe('posts', 20, function () {
    var posts = Meteor.collections['posts'];

    var ids = Object.keys(posts);
    var id = ids[Math.floor(Math.random() * ids.length)];

    Meteor.call('get', id, function (error, result) {
      Meteor.kill();
    });
  });
});

meteorDown.run({
  concurrency: 2000,
  url: "http://localhost:3000"
});