/**
 * Created by jwijnja on 20-6-2017.
 */
class DateTime extends Date {
    constructor() {
        super(...arguments);
        this.dateFormat = {
            "j": this.j(),
            "m": this.m(),
            "n": this.n(),
            "y": this.y(),
            "Y": this.Y(),
            "h": this.h(),
            "H": this.H(),
            "i": this.i(),
            "s": this.s(),
            "g": this.g(),
            "G": this.G(),
        };
    }
    format(format) {
        format = format.replace(/d/, this.d())
            .replace(/j/, this.j())
            .replace(/m/, this.m())
            .replace(/n/, this.n())
            .replace(/y/, this.y())
            .replace(/Y/, this.Y())
            .replace(/h/, this.h())
            .replace(/H/, this.H())
            .replace(/i/, this.i())
            .replace(/s/, this.s())
            .replace(/g/, this.g())
            .replace(/G/, this.G());
        return format;
    }
    Y() {
        return this.getFullYear();
    }
    y() {
        let year = "" + this.getFullYear();
        return year.substring(3, 4);
    }
    d() {
        return this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    }
    j() {
        return this.getDate();
    }
    m() {
        return this.n() < 10 ? "0" + this.n() : this.n();
    }
    n() {
        return this.getMonth() + 1;
    }
    h() {
        return this.g() < 10 ? "0" + this.g() : this.g();
    }
    H() {
        return this.G() < 10 ? "0" + this.G() : this.G();
    }
    i() {
        let minutes = this.getMinutes();
        let timezoneOffSet = this.getTimezoneOffset() / 60;
        timezoneOffSet = (timezoneOffSet + parseInt("" + timezoneOffSet)) * 60;
        return minutes < 10 ? "0" + minutes : minutes;
    }
    s() {
        return this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    }
    g() {
        return this.G() > 12 ? this.G() - 12 : this.G();
    }
    G() {
        return this.getHours() + parseInt("" + this.getTimezoneOffset() / 60);
    }
}
/**
 * Created by jwijnja on 21-6-2017.
 */
Number.prototype.random = function (max = 10, min = 1) {
    return min + Math.floor(Math.random() * (max - min + 1));
};
