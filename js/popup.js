function sortHeaders(n, t) {
  var i = n.name.toLowerCase(),
    r = t.name.toLowerCase();
  return i < r ? -1 : i > r ? 1 : 0;
}

function getStyle(n) {
  var t = "";
  return (
    n.match(/(200|201|202|203|204|205|206|207)/g) !== null && (t = "success"),
    n.match(/(300|301|302|303|304|305|306|307)/g) !== null && (t = "info"),
    n.match(
      /(400|401|402|403|404|405|406|407|408|409|410|411|412|413|414|415|416|417)/g
    ) !== null && (t = "error"),
    n.match(/(500|501|502|503|504|505)/g) !== null && (t = "error"),
    t
  );
}
$(function() {
  chrome.tabs.getSelected(function(n) {
    var i = chrome.extension.getBackgroundPage().headerInfo[n.id],
      t,
      r,
      s,
      u,
      f,
      e,
      o;
    if (i == undefined)
      $("#result").html(
        "<b><br />Could not retrieve any headers, try reload the tab to view the headers.<br />chrome:// pages and Chrome Store don't provide any response headers.<br /><br /></b>"
      );
    else {
      for (console.log(i), t = "", r = 0, s = i.response.length; r < s; ++r) {
        for (
          i.request[r].requestHeaders.sort(sortHeaders),
            i.response[r].responseHeaders.sort(sortHeaders),
            t += '<table class="table table-bordered table-condensed">',
            t +=
              '<tr class="' +
              getStyle(i.response[r].statusLine) +
              '"><td colspan="2">',
            t +=
              "<b>" +
              i.request[r].method +
              '</b> <input type="text" value="' +
              i.response[r].url +
              '" /><br /> <b>Status:</b> ' +
              i.response[r].statusLine,
            t += "</td></tr>",
            t +=
              '<tr class="warning"><td colspan="2"><div class="text-center"><b>Request Headers</b></div></td></tr>',
            u = 0,
            f = i.request[r].requestHeaders.length;
          u < f;
          ++u
        )
          (e = i.request[r].requestHeaders[u].name),
            (o = i.request[r].requestHeaders[u].value),
            (t += "<tr>"),
            (t += '<th nowrap="nowrap">' + e + "</th>"),
            (t +=
              '<td><input type="text" value="' +
              o.replace(/"/g, "&#34;") +
              '" /></td>'),
            (t += "</tr>");
        for (
          t +=
            '<tr class="warning"><td colspan="2"><div class="text-center"><b>Response Headers</b></div></td></tr>',
            u = 0,
            f = i.response[r].responseHeaders.length;
          u < f;
          ++u
        )
          (e = i.response[r].responseHeaders[u].name),
            (o = i.response[r].responseHeaders[u].value),
            (t += "<tr>"),
            (t += '<th nowrap="nowrap">' + e + "</th>"),
            (t +=
              '<td><input type="text" value="' +
              o.replace(/"/g, "&#34;") +
              '" /></td>'),
            (t += "</tr>");
        t += "<table>";
      }
      $("#result").html(t);
      $("input[type=text]").click(function() {
        $(this).select();
      });
    }
  });
});
