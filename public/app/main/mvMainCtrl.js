angular.module('app').controller('mvMainCtrl', function($scope) {
    $scope.employees = [
        { name: 'Darren Peacock', job: 'Centre Half' },
        { name: 'John Beresford', job: 'Left Back' },
        { name: 'Shaka Hislop', job: 'Goalkeeper' },
        { name: 'Les Ferdinand', job: 'Striker' },
        { name: 'David Batty', job: 'Centre Midfield' },
        { name: 'Paul Bracewell', job: 'Centre Midfield' },
        { name: 'Scott Sellars', job: 'Winger' },
        { name: 'Philippe Albert', job: 'Centre Half' }
    ];
})