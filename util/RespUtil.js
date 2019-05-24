
const writeResult = (code, status, msg ,data) => {
  return JSON.stringify({
    code: code,
    status: status,
    msg: msg,
    data: data
  })
}
const viewsResult = (data) => {
  let tempTime = '';
  const tempData = [];
  let tempDataIndex = -1;
  data.forEach(ele => {
    if(ele.ctime !== tempTime ) {
      tempData.push(ele);
      tempDataIndex ++;
      tempTime = ele.ctime
    } else {
      tempData[tempDataIndex].views = +tempData[tempDataIndex].views + +ele.views
    }
  })
  return tempData;
}
module.exports.writeResult = writeResult
module.exports.viewsResult = viewsResult