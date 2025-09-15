"use strict";
const uni_modules_wuUiTools_libs_function_color_colorConvert_conversions = require("./conversions.js");
function buildGraph() {
  const graph = {};
  const models = Object.keys(uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert);
  for (let len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }
  return graph;
}
function deriveBFS(fromModel) {
  const graph = buildGraph();
  const queue = [fromModel];
  graph[fromModel].distance = 0;
  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert[current]);
    for (let len = adjacents.length, i = 0; i < len; i++) {
      const adjacent = adjacents[i];
      const node = graph[adjacent];
      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }
  return graph;
}
function link(from, to) {
  return function(args) {
    return to(from(args));
  };
}
function wrapConversion(toModel, graph) {
  const path = [graph[toModel].parent, toModel];
  let fn = uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }
  fn.conversion = path;
  return fn;
}
function route(fromModel) {
  const graph = deriveBFS(fromModel);
  const conversion = {};
  const models = Object.keys(graph);
  for (let len = models.length, i = 0; i < len; i++) {
    const toModel = models[i];
    const node = graph[toModel];
    if (node.parent === null) {
      continue;
    }
    conversion[toModel] = wrapConversion(toModel, graph);
  }
  return conversion;
}
exports.route = route;
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/function/color/color-convert/route.js.map
