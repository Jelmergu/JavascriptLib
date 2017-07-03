/**
 * Created by jwijnja on 20-6-2017.
 */

class DateTime extends Date {
    static readonly ATOM = 'Y-m-d\\\TH:i:sP';
    static readonly COOKIE = "l, d-M-Y H:i:s T";
    static readonly ISO8601 = "Y-m-d\\\TH:i:sO";
    static readonly RFC822 = "D, d M y H:i:s O";
    static readonly RFC850 = "l, d-M-y H:i:s T";
    static readonly RFC1036 = "D, d M y H:i:s O";
    static readonly RFC1123 = "D, d M Y H:i:s O";
    static readonly RFC2822 = "D, d M Y H:i:s O";
    static readonly RFC3339 = "Y-m-d\\\TH:i:sP";
    static readonly RSS = "D, d M Y H:i:s O";
    static readonly W3C = "Y-m-d\\\TH:i:sP";

    /**
     * This formats the date to the specified format.
     * @param {string} format The format the date should be changed into
     * @returns {string} The formatted date
     */
    format(format: string) {
        let exp: RegExp | string;
        // Full supported
        // [d,D,j,l,N,S,w,z,W,F,m,M,n,t,L,o,Y,y,a,A,B,g,G,h,H,i,s,u,v,e,I,O,P,Z,c,r,U]
        let supportedFunctions = ["d", "j", "N", "w", "z", "m", "M", "n", "Y", "y", "g", "G", "h", "H", "i", "s", "O", "T", "P", "D", "l",];

        /*
         * Reverse the input format to preserve escaped sequences like \T in COOKIE.
         * This is required as there are no lookbehinds in Javascript RegExp
         */
        format = this.reverse(format);

        for (let i of supportedFunctions) {
            exp = new RegExp(i + '(?=(?:[^\\\\]|$))|^' + i + '$', "g");
            format = format.replace(exp, this.reverse(this[i]()));
        }

        // Unreverse the input format
        format = this.reverse(format);

        // Replace escaped sequences with their unescaped counterpart
        exp = new RegExp("\\\\([" + supportedFunctions.join() + "])", "g");
        return format.replace(exp, "$1");

    }

    private reverse(string: any) {
        if (typeof string != "string") {
            string = string.toString();
        }
        return string.split("").reverse().join("");
    }

    /**
     * This returns a full numeric representation of a year, 4 digits
     * @returns {string} (1999, 2003)
     * @example
     */
    private Y(this: DateTime) {
        return this.getFullYear() + "";
    }

    /**
     * This returns a two digit representation of a year
     * @returns {string} (99, 03)
     *
     */
    private y(this: DateTime) {
        let year: string = "" + this.getFullYear();
        return year.substring(3, 4);
    }

    /**
     * This returns the day of the month, 2 digits with leading zeros
     * @returns {string} 01 through 31
     */
    private d(this: DateTime) {
        return this.getDate() < 10 ? "0" + this.getDate() : this.getDate() + "";
    }

    /**
     * This returns the day of the month without leading zeros
     * @returns {string} 1 through 31
     */
    private j(this: DateTime) {
        return this.getDate() + "";
    }

    /**
     * This returns a numeric representation of a month, with leading zeros
     * @returns {string} 01 through 12
     */
    private m(this: DateTime) {
        return this.n() < 10 ? "0" + this.n() : this.n() + "";
    }

    /**
     * This returns a numeric representation of a month, without leading zeros
     * @returns {number} 1 through 12
     */
    private n(this: DateTime) {
        return this.getMonth() + 1;
    }


    /**
     * This returns a 12-hour format of an hour with leading zeros
     * @returns {string} 01 through 12
     */
    private h(this: DateTime) {
        return this.g() < 10 ? "0" + this.g() : this.g() + "";
    }

    /**
     * This returns a 24-hour format of an hour with leading zeros
     * @returns {string} 00 through 23
     */
    private H(this: DateTime) {
        return this.G() < 10 ? "0" + this.G() : this.G() + "";
    }

    /**
     * This returns the minutes with leading zeros
     * @returns {string} 00 through 59
     */
    private i(this: DateTime) {
        let minutes = this.getMinutes();
        let timezoneOffSet: string | number = this.getTimezoneOffset() / 60;
        timezoneOffSet = (timezoneOffSet + parseInt("" + timezoneOffSet)) * 60;

        return minutes < 10 ? "0" + minutes : minutes + "";
    }

    /**
     * This returns the seconds, with leading zeros
     * @returns {string} 00 through 59
     */
    private s(this: DateTime) {
        return this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds() + "";
    }

    /**
     * This returns a 12-hour format of an hour without leading zeros
     * @returns {string} 1 through 12
     */
    private g(this: DateTime) {
        return this.G() > 12 ? this.G() - 12 : this.G();
    }

    /**
     * This returns a 24-hour format of an hour without leading zeros
     * @returns {string} 0 through 23
     */
    private G(this: DateTime) {
        return this.getHours() + parseInt("" + this.getTimezoneOffset() / 60);
    }

    /**
     * This returns the timezone abbreviation
     * @returns {string}
     */
    private T(this: DateTime) {
        return this.toLocaleTimeString('en-us', {timeZoneName: 'short'}).split(' ')[2];
    }

    /**
     * This returns the difference to Greenwich time (GMT) in hours
     * @returns {string} +0200
     * @constructor
     */
    private O() {
        let timeOffset: string | number | string[] = ((this.getTimezoneOffset() / 60) * 100);
        if (timeOffset >= 1000 || timeOffset <= -1000) {
            timeOffset = timeOffset.toString();
        }
        else if (timeOffset < 0) {
            timeOffset = "-0" + timeOffset.toString().split("-").join("");
        }
        else {
            timeOffset = "+0" + timeOffset.toString();
        }
        return timeOffset;
    }

    /**
     * This returns a full english, textual representation of the day of the week
     * @returns {string} Sunday through Saturday
     */
    private l() {
        let days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[this.getDay()];
    }

    /**
     * This returns a english, textual representation of a day, three letters
     * @returns {string}
     * @constructor
     */
    private D() {
        let days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[this.getDay()];
    }

    /**
     * This returns a ISO-8601 numeric representation of the day of the week
     * @returns {string} 1 through 7
     */
    private N() {
        let currentDay: number = this.getDay();
        if (currentDay == 0) {
            currentDay = 7;
        }
        return currentDay + "";
    }

    /**
     * This returns a short, english, textual representation of a month, three letters
     * @returns {string} Jan through Dec
     */
    private M() {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
        return months[this.getDay()];
    }

    /**
     * This returns the difference to Greenwich time (GMT) with colon between hours and minutes
     * @returns {string}
     */
    private P() {
        return this.O().replace(/(\+|-[0-9]{2})([0-9]{2})/, "$1:$2");
    }

    /**
     * This returns the numeric representation of the day of the week
     * @returns {number} 0 through 6
     */
    private w() {
        return this.getDay();
    }

    /**
     * This returns the day of the year
     * @returns {number} 0 through 365(366)
     */
    private z() {
        let startYear = new DateTime(this.getUTCFullYear(), 0, 0);
        let secondDifference = this.valueOf() - startYear.valueOf();
        return Math.floor(secondDifference / (1000 * 60 * 60 * 24)) - 1;
    }

    /*
     public setDate(year: number, month: number, day: number) {
     this.setFullYear(year, month, day);

     }

     /*  public setTime(hour: number, minute: number, second: number) {
     this.setHours(hour);
     this.setMinutes(minute);
     this.setSeconds(second);

     }*/

    public getOffset() {
        return this.getTimezoneOffset();
    }
}

