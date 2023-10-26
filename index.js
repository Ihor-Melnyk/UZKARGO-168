function onChangeDepartment() {
  debugger;
  var Department = EdocsApi.getAttributeValue("Department").value;
  if (Department) {
    var data = EdocsApi.findElementByProperty(
      "id",
      Department,
      EdocsApi.getDictionaryData("Commission")
    ).code;
    setEmployees(data);
  }
}
function setEmployees(data) {
  debugger;
  if (data) {
    const array = data.split(", ");
    var employeeText = null;
    var employee = [];
    for (let index = 0; index < array.length; index++) {
      var employeeById = EdocsApi.getEmployeeDataByEmployeeID(array[index]);
      if (employeeById) {
        employee.push({
          id: 0,
          employeeId: employeeById.employeeId,
          index: index, //потрібно збільшувати на 1
          employeeName: employeeById.shortName,
          positionName: employeeById.positionName,
        });

        employeeText
          ? (employeeText =
              employeeText +
              "\n" +
              employeeById.positionName +
              "\t" +
              employeeById.shortName)
          : (employeeText =
              employeeById.positionName + "\t" + employeeById.shortName);
        employeesValue = `[{"id":0,"employeeId":"${employeeById.employeeId}","index":0,"employeeName":"${employeeById.shortName}","positionName":"${employeeById.positionName}"}]`;
      }
    }
    EdocsApi.setAttributeValue({
      code: "VisaHolder",
      value: JSON.stringify(employee),
      text: employeeText,
    });
  }
}
