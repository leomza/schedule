"use strict";
exports.__esModule = true;
exports.Client = void 0;
var DealTime;
(function (DealTime) {
    DealTime["retainer"] = "retainer";
    DealTime["hourly"] = "hourly";
    DealTime["project"] = "project";
    DealTime["all"] = "all";
})(DealTime || (DealTime = {}));
var Client = /** @class */ (function () {
    function Client(id, clientname, phone, email, dealTime, callLimitPerDay) {
        this.id = id;
        this.clientname = clientname;
        this.phone = phone;
        this.email = email;
        this.dealTime = dealTime;
        this.callLimitPerDay = callLimitPerDay;
        this.createdDate = Date.now();
        this.lastDesignDate = '';
        this.lastCallDate = '';
    }
    return Client;
}());
exports.Client = Client;
