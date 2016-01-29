'use strict';

var Header = function ($scope) {
    this.updateBlockStatus = function (res) {
        if (res.success) {
            $scope.blockStatus = {
                height:    res.height,
                fee:       res.fee,
                milestone: res.milestone,
                reward:    res.reward,
                supply:    res.supply
            };
        }
    };

    this.updatePriceTicker = function (res) {
        if (res.success) {
            $scope.liskBtc = res.lisk;
            $scope.liskUsd = res.usd;
        } else {
            $scope.liskBtc = $scope.liskUsd = 0.0;
        }
    };
};

angular.module('lisk_explorer.system').factory('header',
  function ($socket) {
      return function ($scope) {
          var header = new Header($scope),
              ns = $socket('/header');

          ns.on('data', function (res) {
              if (res.status) { header.updateBlockStatus(res.status); }
              if (res.ticker) { header.updatePriceTicker(res.ticker); }
          });

          $scope.$on('$destroy', function (event) {
              ns.removeAllListeners();
          });

          return header;
      };
  });
