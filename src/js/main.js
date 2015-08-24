function isSubString(small, big) {
    var start = 0;
    var bigLen = big.length;
    for (var i = 0, len = small.length; i < len; i++) {
        while (start < bigLen && small[i] !== big[start]) {
            start++;
            if (start === bigLen) {
                return false;
            }
        }
    }
    return true;
}

function SearchWord() {
    var query = $('#WordQuery').val();
    var result = [];
    window.words.forEach(function(word) {
        if (isSubString(query, word)) {
            result.push(word);
        }
    });
    $('#QueryResult').html(result.join('<br/>'));
}

$(document).ready(function() {
    jQuery.get('words.txt', function(data) {
        window.words = data.split('\n');
    });
    $('#WordQuery').bind('input', SearchWord);
});
