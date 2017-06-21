/**
 * Created by jwijnja on 20-6-2017.
 */

class DateTime extends Date {
    dateFormat = {
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
            .replace(/G/, this.G())
        ;
        return format;
    }

    private Y(this: DateTime) {
        return this.getFullYear();
    }

    private y(this: DateTime) {
        let year: string = "" + this.getFullYear();
        return year.substring(3, 4);
    }

    private d(this: DateTime) {
        return this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    }

    private j(this: DateTime) {
        return this.getDate();
    }

    private m(this: DateTime) {
        return this.n() < 10 ? "0" + this.n() : this.n();
    }

    private n(this: DateTime) {
        return this.getMonth() + 1;
    }

    private h(this: DateTime) {
        return this.g() < 10 ? "0" + this.g() : this.g();
    }

    private H(this: DateTime) {
        return this.G() < 10 ? "0" + this.G() : this.G();
    }

    private i(this: DateTime) {
        let minutes = this.getMinutes();
        let timezoneOffSet:string|number = this.getTimezoneOffset() / 60;
        timezoneOffSet = (timezoneOffSet + parseInt(""+timezoneOffSet)) * 60;

        return minutes < 10 ? "0" + minutes : minutes;
    }

    private s(this: DateTime) {
        return this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    }

    private g(this: DateTime) {
        return this.G() > 12 ? this.G() - 12 : this.G();
    }

    private G(this: DateTime) {
        return this.getHours() + parseInt(""+this.getTimezoneOffset() / 60);
    }
}

