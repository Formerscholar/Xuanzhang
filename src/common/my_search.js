$.expr[':'].Contains = function(a, i, m) {
  return (
    (a.textContent || a.innerText || '')
      .toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0
  )
}

export function filterList(header, list) {
  $('#forms')
    .change(function() {
      var filter = $(this).val()
      if (filter) {
        var matches = $(list)
          .find('span:Contains(' + filter + ')')
          .parent()
        $('li', list)
          .not(matches)
          .slideUp()
        matches.slideDown()
      } else {
        $(list)
          .find('li')
          .slideDown()
      }
      return false
    })
    .keyup(function() {
      $(this).change()
    })
}
