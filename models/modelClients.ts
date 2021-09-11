export { };

enum DealTime {
    retainer = 'retainer',
    hourly = 'hourly',
    project = 'project',
    all = 'all'
}

export class Client {
    id: string;
    clientname: string;
    phone: string;
    email: string;
    dealTime: DealTime;
    callLimitPerDay: string;
    createdDate: any;
    lastDesignDate: any;
    lastCallDate: any;

    constructor(id: string, clientname: string, phone: string, email: string, dealTime: DealTime, callLimitPerDay: string) {
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
}