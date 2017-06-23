/**
 * Created by jwijnja on 20-6-2017.
 */

class DateTime extends Date {
    static readonly ATOM = 'Y-m-d\TH:i:sP';
    static readonly COOKIE = "l, d-M-Y H:i:s T";
    static readonly ISO8601 = "";
    static readonly RFC822 = "";
    static readonly RFC850 = "";
    static readonly RFC1036 = "";
    static readonly RFC1123 = "";
    static readonly RFC2822 = "";
    static readonly RFC3339 = "";
    static readonly RSS = "";
    static readonly W3C = "";


    format(format) {
        format = format // Reverse the pattern, JS regex does not have a lookbehind
            .replace(/d(?=[^\\]{1})/, this.d())
            .replace(/j(?=[^\\]{1})/, this.j())
            .replace(/m(?=[^\\]{1})/, this.m())
            .replace(/n(?=[^\\]{1})/, this.n())
            .replace(/y(?=[^\\]{1})/, this.y())
            .replace(/Y(?=[^\\]{1})/, this.Y())
            .replace(/h(?=[^\\]{1})/, this.h())
            .replace(/H(?=[^\\]{1})/, this.H())
            .replace(/i(?=[^\\]{1})/, this.i())
            .replace(/s(?=[^\\]{1})/, this.s())
            .replace(/g(?=[^\\]{1})/, this.g())
            .replace(/G(?=[^\\]{1})/, this.G())
            .replace(/T(?=[^\\]{1})/, this.T())
            .split("").reverse().join(""); // unreverse the pattern
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
        let timezoneOffSet: string | number = this.getTimezoneOffset() / 60;
        timezoneOffSet = (timezoneOffSet + parseInt("" + timezoneOffSet)) * 60;

        return minutes < 10 ? "0" + minutes : minutes;
    }

    private s(this: DateTime) {
        return this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    }

    private g(this: DateTime) {
        return this.G() > 12 ? this.G() - 12 : this.G();
    }

    private G(this: DateTime) {
        return this.getHours() + parseInt("" + this.getTimezoneOffset() / 60);
    }

    private T(this:DateTime) {
        return this.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
    }

    private O() {
        let timeOffset = ((this.getTimezoneOffset /60) * 100).toString();
        if (timeOffset >= 1000 || timeOffset <= -1000) {

        }
        return "+0100";
    }
    public setDate(year: number, month: number, day: number) {
        this.setFullYear(year, month, day);
        return this;
    }

    public setTime(hour: number, minute: number, second: number) {
        this.setHours(hour);
        this.setMinutes(minute);
        this.setSeconds(second);
        return this;
    }

    public getOffset() {
        return this.getTimezoneOffset();
    }
}

