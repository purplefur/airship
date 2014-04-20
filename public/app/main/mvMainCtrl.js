angular.module('app').controller('mvMainCtrl', function($scope, screens) {
    screens.getList().then(function(result) {
        $scope.screen = result[0];
        console.log(result);
    });

    $scope.formTemplate = {
        "first": {
            "type": "text",
            "label": "First Name"
        },
        "middle": {
            "type": "text",
            "label": "Middle Name"
        },
        "last": {
            "type": "text",
            "label": "Surname"
        },
        "unknown": {
            "type": "jubbly",
            "label": "<p>i am a jubbly</p>"
        },
        "submit": {
            "type": "submit",
            "label": "OK"
        }
    };
});