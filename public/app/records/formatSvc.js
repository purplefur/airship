angular.module('records').factory('formatSvc', function () {

  return {
    formatAsText: function (field, record, referenceData) {
      var formattedValue = record.data[field.name];
      switch (field.type) {
        case 'date':
          formattedValue = moment(formattedValue).format('Do MMM YYYY');
          break;
        case 'ref_data':
          var refData = referenceData[field.ref_data_id];
          if (!refData || !refData.values) {
            console.log('WHERE THE HECK IS REF DATA ' + field.ref_data_id);
          }
          else {
            var refDataRecord = _.find(refData.values, { id: parseInt(formattedValue) })
            if (!!refDataRecord) {
              formattedValue = refDataRecord.label;
            }
            else {
              console.log('eh? we looking for ' + field.name);
            }
          }
          break;
      }
      return formattedValue;
    }

  };

});

