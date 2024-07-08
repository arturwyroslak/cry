/*
    globals process
*/
const VALUES = {};
VALUES.mem = () => {
    return process.memoryUsage();
};
let oldCpu;
VALUES.cpu = () => {
    if (!oldCpu) {
        oldCpu = process.cpuUsage();
        return {user:0,system:0};
    }
    let val = process.cpuUsage(oldCpu);
    oldCpu = process.cpuUsage();
    return val;
};
const calls = {};
VALUES.calls = () => {
    return calls;
};

const applyToEnv = (Env, data) => {
    if (!Env) { return; }
    Env.monitoring[data.pid] = data;
};
const getData = (type) => {
    const value = {
        pid: process.pid,
        type: type
    };
    Object.keys(VALUES).forEach(key => {
        value[key] = VALUES[key]();
    });
    return value;
};

const remove = (Env, pid) => {
    if (Env && Env.monitoring && pid && Env.monitoring[pid]) {
        delete Env.monitoring[pid];
    }
};

const increment = (key) => {
    calls[key] = calls[key] || 0;
    calls[key]++;
};

module.exports = {
    interval: 5000,
    applyToEnv,
    increment,
    getData,
    remove
};
