const availableCabs = (cabsData, time) => {
    // console.log(cabsData);
    let g = new Date(time);
    const minTimeInMillis = (330) * 60000;
    g.setTime(g.getTime() + minTimeInMillis);
    // console.log("COnsole Out Time Object");
    // console.log(g);
    // time.toISOString();
    // return cabsData;
    return cabsData.filter((obj) => {
        // console.log(obj.end_time);
        // console.log(g);
        // console.log(obj.end_time.getTime() < g.getTime());
        return obj.end_time.getTime() < g.getTime();
    });
    // return cabsData;
};

module.exports = { availableCabs: availableCabs };