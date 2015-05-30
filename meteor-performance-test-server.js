Posts = new Meteor.Collection('posts');
Comments = new Meteor.Collection('comments');

if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var count = 1000;

    if (Posts.find().count() >= count)
      return;

    for (var i = 0; i < count; i++) {
      var _id = Posts.insert({
        title: 'title' + count,
        content: (new Array(1025)).join('m'),
      });

      for (var j = 0; j < 20; j++) {
        Comments.insert({
          postId: _id,
          content:  (new Array(20)).join('m'),
          createdAt: new Date,
        });
      }
    }
  });

  // 发布数据
  Meteor.publish('posts', function(limit){
    return Posts.find({}, {limit: limit});
  });

  // 提供方法
  Meteor.methods({
    get: function(postId) {
      return Comments.find({postId: postId}).fetch();
    }
  });
}
