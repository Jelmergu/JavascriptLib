/**
 * Created by jwijnja on 21-6-2017.
 */

Number.prototype.random = function(max = 10, min = 1) {
    return min + Math.floor(Math.random() * (max - min + 1));
};