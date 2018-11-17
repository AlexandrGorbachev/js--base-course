
var compileTemplate = (tpl) => (el, data) => {     
    el.innerHTML = tpl.replace(/{{(\w+?)}}/g, (match, group) => data[group]);
}

////

function EventBus(){
  this.listeners = {};
}
EventBus.prototype.on = function(eventName, cb){
  this.listeners[eventName] = this.listeners[eventName] || [];
  this.listeners[eventName].push(cb);
}
EventBus.prototype.once = function(eventName, cb){
  var self = this;
  this.on(eventName, function envelope(data){
    cb.call(self, data);
    self.off(eventName, envelope);
  })
}
EventBus.prototype.off = function(eventName, cb){
  if (cb){
    this.listeners[eventName] = this.listeners[eventName].filter(function(eventCb){
      return eventCb != cb;
    });
  } else {
    this.listeners[eventName] = [];
  }
}
EventBus.prototype.trigger = function(eventName, data){
  if (!this.listeners[eventName]) return;
  this.listeners[eventName].forEach(function(singleCbObj){
    singleCbObj(data);
  });
}

////

var Router = function (options) {
  if (!options) return console.log("options needed");
  this.routes = options.routes || [];
}

Router.prototype = {
  init: function () {
    console.log('router init');
    window.addEventListener('hashchange', () => this.handleUrl(getHash()));
    this.handleUrl(getHash());
  },
  handleUrl: function (hash) {
    var properRoute = findProperRoute(this.routes, hash),
      route = properRoute[0],
      paramForRoute = properRoute[1];
    
    Promise.resolve()
      .then(() => {
        if (this.oldRoute && this.oldRoute[0] && this.oldRoute[0].onLeave) 
          return this.oldRoute[0].onLeave(this.oldRoute[1]);
      })
      .then(() => {
        if (route && route.onBeforeEnter) 
          return route.onBeforeEnter(paramForRoute);
      })
      .then(() => {
        this.oldRoute = properRoute;
        if (route && route.onEnter) 
          return route.onEnter(paramForRoute);
      })
  }
};

function getHash(){
  return decodeURI(window.location.hash).slice(1);
}

function findProperRoute(listOfRoutes, hash){
  var findedRoute;
  listOfRoutes.forEach(function(singleRoute){
    if (singleRoute.match === hash) {
      findedRoute = [singleRoute, null];
    }
    else if (singleRoute.match instanceof RegExp && singleRoute.match.test(hash)){
      findedRoute = [singleRoute, hash.match(singleRoute.match)[1]];
    }
    else if (typeof singleRoute.match === "function" && singleRoute.match(hash)){
      findedRoute = [singleRoute, null];
    } 
  })
  return findedRoute;
}

//don't forget to init