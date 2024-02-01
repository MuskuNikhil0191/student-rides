"use strict";

$(document).ready(function () {
  $("#rides").DataTable({
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, "All"],
    ],
  });
});
