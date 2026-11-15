/* Small chart engine for the demo pages. Plain SVG, no libraries.
   Colors come from CSS variables so light and dark mode both work. */

(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) {
      if (k === "style") { node.setAttribute("style", attrs[k]); }
      else { node.setAttribute(k, attrs[k]); }
    }
    return node;
  }

  function div(className, text) {
    var d = document.createElement("div");
    if (className) { d.className = className; }
    if (text !== undefined) { d.textContent = text; }
    return d;
  }

  function fmtMoney(n) {
    var sign = n < 0 ? "-" : "";
    var a = Math.abs(n);
    if (a >= 1000000) { return sign + "$" + (a / 1000000).toFixed(1) + "M"; }
    if (a >= 10000) { return sign + "$" + (a / 1000).toFixed(1) + "K"; }
    return sign + "$" + a.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }

  function fmtMoneyFull(n) {
    var sign = n < 0 ? "-" : "";
    return sign + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function niceTicks(maxVal, count, minVal) {
    minVal = minVal || 0;
    var rough = (maxVal - minVal) / count;
    var mag = Math.pow(10, Math.floor(Math.log(rough) / Math.LN10));
    var steps = [1, 2, 2.5, 5, 10];
    var step = steps[steps.length - 1] * mag;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i] * mag >= rough) { step = steps[i] * mag; break; }
    }
    var lo = Math.floor(minVal / step) * step;
    var ticks = [lo];
    while (ticks[ticks.length - 1] < maxVal - step * 0.001) {
      ticks.push(ticks[ticks.length - 1] + step);
    }
    return ticks;
  }

  /* one shared tooltip */
  var tip = null;
  function getTip() {
    if (!tip) {
      tip = div("viz-tooltip");
      document.body.appendChild(tip);
    }
    return tip;
  }

  function showTip(evt, title, rows) {
    var t = getTip();
    t.textContent = "";
    t.appendChild(div("tt-title", title));
    rows.forEach(function (r) {
      var row = div("tt-row");
      if (r.color) {
        var key = div("tt-key");
        key.style.borderTopColor = r.color;
        row.appendChild(key);
      }
      var val = document.createElement("span");
      val.className = "tt-val";
      val.textContent = r.value;
      row.appendChild(val);
      var name = document.createElement("span");
      name.className = "tt-name";
      name.textContent = r.name;
      row.appendChild(name);
      t.appendChild(row);
    });
    t.style.display = "block";
    moveTip(evt);
  }

  function moveTip(evt) {
    var t = getTip();
    var x = evt.clientX + 14;
    var y = evt.clientY + 12;
    var w = t.offsetWidth;
    var h = t.offsetHeight;
    if (x + w > window.innerWidth - 8) { x = evt.clientX - w - 12; }
    if (y + h > window.innerHeight - 8) { y = evt.clientY - h - 10; }
    t.style.left = x + "px";
    t.style.top = y + "px";
  }

  function hideTip() {
    if (tip) { tip.style.display = "none"; }
  }

  /* bar with a rounded data end and a square baseline end */
  function barPath(x, y, w, h, r, horizontal) {
    if (horizontal) {
      r = Math.min(r, w, h / 2);
      return "M" + x + "," + y + " h" + (w - r) + " a" + r + "," + r + " 0 0 1 " + r + "," + r +
        " v" + (h - 2 * r) + " a" + r + "," + r + " 0 0 1 " + (-r) + "," + r + " h" + (-(w - r)) + " z";
    }
    r = Math.min(r, h, w / 2);
    return "M" + x + "," + (y + h) + " v" + (-(h - r)) + " a" + r + "," + r + " 0 0 1 " + r + "," + (-r) +
      " h" + (w - 2 * r) + " a" + r + "," + r + " 0 0 1 " + r + "," + r + " v" + (h - r) + " z";
  }

  function legend(holder, series, kind) {
    var ul = document.createElement("ul");
    ul.className = "viz-legend";
    series.forEach(function (s) {
      var li = document.createElement("li");
      var key = document.createElement("span");
      key.className = kind === "line" ? "linekey" : "swatch";
      if (kind === "line") { key.style.borderTopColor = s.color; }
      else { key.style.background = s.color; }
      li.appendChild(key);
      li.appendChild(document.createTextNode(s.name));
      ul.appendChild(li);
    });
    holder.appendChild(ul);
  }

  function responsive(holder, renderFn) {
    var raf = null;
    function go() {
      var w = Math.max(300, holder.clientWidth);
      holder.querySelectorAll("svg").forEach(function (s) { s.remove(); });
      renderFn(w);
    }
    go();
    window.addEventListener("resize", function () {
      if (raf) { cancelAnimationFrame(raf); }
      raf = requestAnimationFrame(go);
    });
  }

  /* horizontal bars: one measure across a few categories, single hue */
  function hBars(holder, rows, valueFmt) {
    responsive(holder, function (W) {
      var rowH = 44;
      var labelW = Math.min(170, W * 0.34);
      var H = rows.length * rowH + 6;
      var maxV = 0;
      rows.forEach(function (r) { if (r.value > maxV) { maxV = r.value; } });
      var plotW = W - labelW - 70;
      var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "viz-svg", role: "img", "aria-label": "Bar chart" });

      rows.forEach(function (r, i) {
        var y = i * rowH + 10;
        var bw = maxV > 0 ? Math.max(2, (r.value / maxV) * plotW) : 2;
        var lab = svgEl("text", { x: labelW - 10, y: y + 16, "text-anchor": "end", "font-size": 13, style: "fill:var(--text)" });
        lab.textContent = r.label;
        svg.appendChild(lab);
        var bar = svgEl("path", { d: barPath(labelW, y, bw, 22, 4, true), style: "fill:var(--viz-s1)" });
        svg.appendChild(bar);
        var val = svgEl("text", { x: labelW + bw + 8, y: y + 16, "font-size": 13, "font-weight": 600, style: "fill:var(--text)" });
        val.textContent = valueFmt(r.value);
        svg.appendChild(val);
        var hit = svgEl("rect", { x: 0, y: y - 6, width: W, height: rowH - 4, fill: "transparent", tabindex: 0, role: "img", "aria-label": r.label + ": " + valueFmt(r.value) + (r.sub ? ", " + r.sub : "") });
        hit.addEventListener("pointermove", function (e) { showTip(e, r.label, [{ value: valueFmt(r.value), name: r.sub || "" }]); });
        hit.addEventListener("pointerleave", hideTip);
        hit.addEventListener("blur", hideTip);
        svg.appendChild(hit);
      });
      holder.appendChild(svg);
    });
  }

  /* vertical columns, optionally stacked. series: [{name, color, values[]}] */
  function columns(holder, xLabels, series, opts) {
    opts = opts || {};
    if (series.length > 1) { legend(holder, series, "rect"); }
    responsive(holder, function (W) {
      var H = 290;
      var mL = 52, mR = 8, mT = 12, mB = 34;
      var plotW = W - mL - mR, plotH = H - mT - mB;
      var n = xLabels.length;
      var totals = xLabels.map(function (_, i) {
        var t = 0;
        series.forEach(function (s) { t += s.values[i]; });
        return t;
      });
      var maxV = Math.max.apply(null, totals);
      var ticks = niceTicks(maxV, 4);
      var top = ticks[ticks.length - 1];
      var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "viz-svg", role: "img", "aria-label": opts.label || "Column chart" });

      ticks.forEach(function (tv) {
        var y = mT + plotH - (tv / top) * plotH;
        svg.appendChild(svgEl("line", { x1: mL, y1: y, x2: W - mR, y2: y, "stroke-width": 1, style: "stroke:var(--viz-grid)" }));
        var t = svgEl("text", { x: mL - 8, y: y + 4, "text-anchor": "end", "font-size": 11, style: "fill:var(--viz-muted)" });
        t.textContent = opts.money ? fmtMoney(tv) : tv.toLocaleString("en-US");
        svg.appendChild(t);
      });
      svg.appendChild(svgEl("line", { x1: mL, y1: mT + plotH, x2: W - mR, y2: mT + plotH, "stroke-width": 1, style: "stroke:var(--viz-axis)" }));

      var band = plotW / n;
      var colW = Math.min(24, band * 0.6);
      var labelEvery = band < 34 ? 2 : 1;

      xLabels.forEach(function (xl, i) {
        var cx = mL + band * i + band / 2;
        var x0 = cx - colW / 2;
        var yCursor = mT + plotH;
        series.forEach(function (s, si) {
          var h = (s.values[i] / top) * plotH;
          if (h <= 0) { return; }
          yCursor -= h;
          var isTop = si === series.length - 1 || series.slice(si + 1).every(function (s2) { return s2.values[i] <= 0; });
          var seg;
          if (isTop) {
            seg = svgEl("path", { d: barPath(x0, yCursor, colW, h, 4, false), style: "fill:" + s.color + ";stroke:var(--surface);stroke-width:2" });
          } else {
            seg = svgEl("rect", { x: x0, y: yCursor, width: colW, height: h, style: "fill:" + s.color + ";stroke:var(--surface);stroke-width:2" });
          }
          svg.appendChild(seg);
        });
        if (i % labelEvery === 0) {
          var t = svgEl("text", { x: cx, y: H - 12, "text-anchor": "middle", "font-size": 11, style: "fill:var(--viz-muted)" });
          t.textContent = xl;
          svg.appendChild(t);
        }
        var readout = series.map(function (s) { return s.name + " " + (opts.money ? fmtMoney(s.values[i]) : s.values[i]); }).join(", ");
        var hit = svgEl("rect", { x: mL + band * i, y: mT, width: band, height: plotH, fill: "transparent", tabindex: 0, role: "img", "aria-label": xl + ": " + readout });
        hit.addEventListener("pointermove", function (e) {
          var rows = series.map(function (s) {
            return { color: s.color, name: s.name, value: opts.money ? fmtMoney(s.values[i]) : s.values[i].toLocaleString("en-US") };
          }).reverse();
          if (series.length > 1) {
            rows.unshift({ name: "total", value: opts.money ? fmtMoney(totals[i]) : totals[i].toLocaleString("en-US") });
          }
          showTip(e, xl, rows);
        });
        hit.addEventListener("pointerleave", hideTip);
        hit.addEventListener("blur", hideTip);
        svg.appendChild(hit);
      });
      holder.appendChild(svg);
    });
  }

  /* multi series line chart with crosshair tooltip and end labels */
  function lines(holder, xLabels, series, opts) {
    opts = opts || {};
    if (series.length > 1) { legend(holder, series, "line"); }
    responsive(holder, function (W) {
      var H = 290;
      var endLabelW = opts.endLabels ? 60 : 10;
      var mL = 52, mR = endLabelW, mT = 14, mB = 34;
      var plotW = W - mL - mR, plotH = H - mT - mB;
      var n = xLabels.length;
      var maxV = 0, minV = Infinity;
      series.forEach(function (s) {
        s.values.forEach(function (v) { if (v > maxV) { maxV = v; } if (v < minV) { minV = v; } });
      });
      var floorV = opts.floor ? Math.max(0, minV - (maxV - minV) * 0.35) : 0;
      var ticks = niceTicks(maxV * 1.02, 4, floorV);
      var top = ticks[ticks.length - 1];
      var lo = ticks[0];
      var X = function (i) { return mL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW); };
      var Y = function (v) { return mT + plotH - ((v - lo) / (top - lo)) * plotH; };
      var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, class: "viz-svg", role: "img", "aria-label": opts.label || "Line chart" });

      ticks.forEach(function (tv) {
        var y = Y(tv);
        svg.appendChild(svgEl("line", { x1: mL, y1: y, x2: mL + plotW, y2: y, "stroke-width": 1, style: "stroke:var(--viz-grid)" }));
        var t = svgEl("text", { x: mL - 8, y: y + 4, "text-anchor": "end", "font-size": 11, style: "fill:var(--viz-muted)" });
        t.textContent = opts.money ? fmtMoney(tv) : tv.toLocaleString("en-US");
        svg.appendChild(t);
      });
      var labelEvery = plotW / n < 42 ? 2 : 1;
      xLabels.forEach(function (xl, i) {
        if (i % labelEvery !== 0) { return; }
        var t = svgEl("text", { x: X(i), y: H - 12, "text-anchor": "middle", "font-size": 11, style: "fill:var(--viz-muted)" });
        t.textContent = xl;
        svg.appendChild(t);
      });

      var cross = svgEl("line", { x1: 0, y1: mT, x2: 0, y2: mT + plotH, "stroke-width": 1, style: "stroke:var(--viz-axis);display:none" });
      svg.appendChild(cross);

      series.forEach(function (s) {
        var d = s.values.map(function (v, i) { return (i === 0 ? "M" : "L") + X(i) + "," + Y(v); }).join(" ");
        svg.appendChild(svgEl("path", { d: d, fill: "none", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round", style: "stroke:" + s.color }));
        var li = n - 1;
        svg.appendChild(svgEl("circle", { cx: X(li), cy: Y(s.values[li]), r: 4.5, style: "fill:" + s.color + ";stroke:var(--surface);stroke-width:2" }));
        if (opts.endLabels) {
          var t = svgEl("text", { x: X(li) + 9, y: Y(s.values[li]) + 4, "font-size": 12, "font-weight": 600, style: "fill:var(--text)" });
          t.textContent = opts.money ? fmtMoneyFull(s.values[li]) : s.values[li].toLocaleString("en-US");
          svg.appendChild(t);
        }
      });

      var hit = svgEl("rect", { x: mL, y: mT, width: plotW, height: plotH, fill: "transparent" });
      hit.addEventListener("pointermove", function (e) {
        var rect = svg.getBoundingClientRect();
        var scale = W / rect.width;
        var px = (e.clientX - rect.left) * scale;
        var i = Math.round(((px - mL) / plotW) * (n - 1));
        i = Math.max(0, Math.min(n - 1, i));
        cross.setAttribute("x1", X(i));
        cross.setAttribute("x2", X(i));
        cross.style.display = "";
        showTip(e, xLabels[i], series.map(function (s) {
          return { color: s.color, name: s.name, value: opts.money ? fmtMoneyFull(s.values[i]) : s.values[i].toLocaleString("en-US") };
        }));
      });
      hit.addEventListener("pointerleave", function () { cross.style.display = "none"; hideTip(); });
      svg.appendChild(hit);
      holder.appendChild(svg);
    });
  }

  function table(holder, headers, rows, numCols) {
    holder.textContent = "";
    var wrap = div("demo-table-wrap");
    var t = document.createElement("table");
    t.className = "demo-table";
    var thead = document.createElement("thead");
    var trh = document.createElement("tr");
    headers.forEach(function (h, i) {
      var th = document.createElement("th");
      th.textContent = h;
      th.scope = "col";
      if (numCols.indexOf(i) !== -1) { th.className = "num"; }
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    t.appendChild(thead);
    var tbody = document.createElement("tbody");
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      r.forEach(function (cell, i) {
        var td = document.createElement("td");
        if (cell && cell.tag) {
          var span = document.createElement("span");
          span.className = "issue-tag";
          span.textContent = cell.tag;
          td.appendChild(span);
        } else {
          td.textContent = cell;
        }
        if (numCols.indexOf(i) !== -1) { td.className = "num"; }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    t.appendChild(tbody);
    wrap.appendChild(t);
    holder.appendChild(wrap);
  }

  function statTile(holder, label, value, sub, subBad) {
    var tile = div("stat-tile");
    tile.appendChild(div("t-label", label));
    tile.appendChild(div("t-value", value));
    if (sub) {
      var s = div("t-sub", sub);
      if (subBad) { s.className = "t-sub bad"; }
      tile.appendChild(s);
    }
    holder.appendChild(tile);
  }

  window.VIZ = {
    hBars: hBars,
    columns: columns,
    lines: lines,
    table: table,
    statTile: statTile,
    fmtMoney: fmtMoney,
    fmtMoneyFull: fmtMoneyFull,
    colors: function () {
      var cs = getComputedStyle(document.documentElement);
      return [1, 2, 3, 4, 5].map(function (i) { return cs.getPropertyValue("--viz-s" + i).trim(); });
    }
  };
})();
