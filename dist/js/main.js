function ViMap(c) {
    if ($.inArray(c, ['a', 'á', 'à', 'ả', 'ã', 'ạ']) !== -1) {
        return 'a';
    }
    if ($.inArray(c, ['ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ']) !== -1) {
        return 'ă';
    }
    if ($.inArray(c, ['â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ']) !== -1) {
        return 'â';
    }
    if ($.inArray(c, ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ']) !== -1) {
        return 'e';
    }
    if ($.inArray(c, ['ê', 'ế', 'ề', 'ể', 'ễ', 'ệ']) !== -1) {
        return 'ê';
    }
    if ($.inArray(c, ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị']) !== -1) {
        return 'i';
    }
    if ($.inArray(c, ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ']) !== -1) {
        return 'o';
    }
    if ($.inArray(c, ['ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ']) !== -1) {
        return 'ô';
    }
    if ($.inArray(c, ['ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ']) !== -1) {
        return 'ơ';
    }
    if ($.inArray(c, ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ']) !== -1) {
        return 'u';
    }
    if ($.inArray(c, ['ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự']) !== -1) {
        return 'ư';
    }
    if ($.inArray(c, ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ']) !== -1) {
        return 'y';
    }
    return c;
}

function isSubString(small, big) {
    small = small.toLocaleLowerCase();
    big = big.toLocaleLowerCase();
    var start = 0;
    var bigLen = big.length;
    for (var i = 0, len = small.length; i < len; i++) {
        if (start === bigLen) {
            return false;
        }
        while (start < bigLen && ViMap(small[i]) !== ViMap(big[start])) {
            start++;
            if (start === bigLen) {
                return false;
            }
        }
        start++;
    }
    return true;
}

function SearchWord() {
    var query = $('#WordQuery').val();
    var result = [];
    var LIMIT = 10;
    for (var i = 0; i < window.words.length; i++) {
        if (isSubString(query, window.words[i])) {
            result.push(window.words[i]);
            if (result.length > LIMIT) {
                break;
            }
        }
    }
    $('#QueryResult').html(result.join('<br/>'));
}

function wordFilter(w) {
    var all = w.split('_');
    return !all.some(function(e) {
        return e.length > 7 || (e.length > 0 && e[0] === e[0].toUpperCase());
    });
}

$(document).ready(function() {
    $.get('words.txt', function(data) {
        window.words = data.split('\n').filter(wordFilter);
    });
    $('#WordQuery').bind('input', SearchWord);
});
