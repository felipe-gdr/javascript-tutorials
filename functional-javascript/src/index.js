const { List } = require("immutable-ext");
const {fromNullable, Right} = require("./either");
const {Sum} = require("./sum");

const stats = List.of({
  page: "Index",
  views: 40
}, {
  page: "Home",
  views:10
}, {
  page: "Menu",
  views: 4
});

const result = stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0)));

console.log(result);
