// JavaScript Document
var enter_mutex = function(fn, delay) {
        setTimeout(function() {
            if (mutex_lock() == 0) {
                fn()
				mutex_unlock()
            } else {
                setTimeout(arguments.callee, 500)
            }
        },
        (delay || 0) * 1000)
    };/*  |xGv00|b8296ba2002195a6f27e48d4389d3c0a */