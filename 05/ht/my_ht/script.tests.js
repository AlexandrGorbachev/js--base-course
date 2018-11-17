"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup("bdd");
var assert = chai.assert;
var expect = chai.expect;

describe("compileTemplate", () => {
  var el = document.createElement('div');

  it("is a function", () => {
    return assert.isOk(typeof compileTemplate === "function");
  });
  it("returns function", () => {
    return assert.isOk(typeof compileTemplate(null) === "function");
  });
  it("returns proper result and element type", () => {
    var tpl = "{{name}} is {{age}} years old";
    var template = compileTemplate(tpl);
    template(el, { name: 'Bob', age: 33 });
    return assert.isOk(el.tagName === "DIV") && assert.isOk(el.innerHTML === "Bob is 33 years old");
  });
  it("change not specified properties to undefined", () => {
    var tpl = "{{name}} is {{age}} years old";
    var template = compileTemplate(tpl);

    template(el, { name: 'Bob'});
    return assert.isOk(el.innerHTML === "Bob is undefined years old");
  });
  it("process repeating variables correctly and inner function return nothing", () => {
    var tpl = "{{name}} is {{age}} years old, {{name}}!";
    var template = compileTemplate(tpl);

    var result = template(el, { name: 'Bob', age: 33 });
    return assert.isOk(el.innerHTML === "Bob is 33 years old, Bob!") && assert.isOk(result === "undefined");
  });
});

describe("EventBus", () => {
  var result = 0; 
  var eb = new EventBus();
  var x = (data) => {result += data};
  var y = (data) => {result += data*2};
  var z = (data) => {result += data*3};

  it("is a function", () => {
    return assert.isOk(typeof EventBus === "function");
  });
    it("has a listeners property", () => {
    return assert.isOk(typeof (eb.listeners) === "object");
  });

  describe("adding logic", () => {   
    eb.on("event", x);
    eb.on("event", y);
    eb.on("event", z);
    it("add some callbacks for event", () => {
      return assert.isOk(eb.listeners["event"].length === 3);
    });
    it("callbacks are functions", () => {
      return assert.isOk(typeof eb.listeners["event"][0] === "function");
    });
  });

  describe("removing logic", () => {    
    it("removes one callback by listener name and callback", () => {
      eb.off("event", x);
      return assert.isOk(eb.listeners["event"].length === 2);
    });
    it("removes all callbacks by listener name", () => {
        eb.off("event");
      return assert.isOk(eb.listeners["event"].length === 0);
    });
  });

  describe("triggering logic", () => {  
    var eb1 = new EventBus();
    eb1.on("event", x);
    eb1.on("event", y);
    eb1.on("event", z);  
    it("triggering callbacks return proper result", () => {
      result = 0;
      eb1.trigger("event", 2);
      return assert.isOk(result === 12);
    });
    it("doesn't trigger removed callback", () => {
      result = 0;
      eb1.off("event", y);
      eb1.trigger("event", 2);
      return assert.isOk(result === 8);
    });
    it("triggers all the listeners", () => {
      result = 0;
      eb1.on("event2", x);
      eb1.trigger("event2", 2);
      return assert.isOk(result === 2);
    });
    it("doesn't trigger all removed callbacks", () => {
      result = 0;
      eb1.off("event");
      eb1.trigger("event");
      return assert.isOk(result === 0);
    });
    it("allows to duplicate callbacks", () => {
      result = 0;
      var eb3 = new EventBus();
      eb3.on("event", x);
      eb3.on("event", x);
      eb3.trigger("event", 2);
      return assert.isOk(result === 4);
    });
  });

  describe("once logic", () => {  
    var eb2 = new EventBus();
    eb2.on("event", x);
    eb2.once("event", y);
    eb2.on("event", z);  
    it("'once' callback triggers only once", () => {
      result = 0;
      eb2.trigger("event", 2);
      eb2.trigger("event", 2);
      return assert.isOk(result === 20);
    });
  });
});


describe("Router", () => {
  var myRoutes = {
  routes: [
    {
      name: 'index',
      match: '',
      onBeforeEnter: () => console.log('onBeforeEnter index'),
      onEnter: () => console.log('onEnter index'),
      onLeave: () => console.log('onLeave index')
    },
    {
      name: 'city',
      match: /city=(.+)/,
      onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
      onEnter: (city) => console.log(`onEnter city:${city}`),
      onLeave: (city) => console.log(`onLeave city:${city}`)
    },
    {
      name: 'about',
      match: (text) => text === 'about',
      onBeforeEnter: () => console.log(`onBeforeEnter about`),
      onEnter: () => console.log(`onEnter about`),
      onLeave: () => console.log(`onLeave about`)
    }
  ]};

  var router = new Router(myRoutes);
  router.init();

  it("is a constructor-function", () => {
    return assert.isOk(typeof Router === "function" && router instanceof Router);
  });
  it("sets options", () => {
    return assert.isOk(myRoutes.routes === router.routes);
  });

  describe("Logic", () => {
    it("uses init() to start", () => {
      var myRoutes2 = {
        routes: [
          {
            match: 'about',
            onBeforeEnter: () => {},
            onEnter: () => {window.location.hash = ""},
            onLeave: () => {}
          }
        ]};
      var router2 = new Router(myRoutes2);
      window.location.hash = "#about";
      router2.init();
      setTimeout(() => assert.isOk(window.location.hash === ""), 0);   
    })
    it("handleUrl is a method on prototype", () => {
      assert.isOk(typeof new Router().handleUrl === "function");
      assert.isOk(new Router().handleUrl === Router.prototype.handleUrl);
    });
  })
});

mocha.run();