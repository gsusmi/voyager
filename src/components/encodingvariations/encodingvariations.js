'use strict';

/**
 * @ngdoc directive
 * @name facetedviz.directive:encodingVariations
 * @description
 * # encodingVariations
 */
angular.module('facetedviz')
  .directive('encodingVariations', function (Visrec, Bookmarks, consts, $document, _, Logger) {

    return {
      templateUrl: 'components/encodingvariations/encodingvariations.html',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function postLink(scope/*, element, attrs*/) {
        scope.Visrec = Visrec;
        scope.Bookmarks = Bookmarks;
        scope.consts = consts;
        scope._ = _;

        function escape(e) {

          if (e.keyCode === 27) {
            console.log('escape');
            scope.close();
            angular.element($document).off('keydown', escape);
          }
        }

        angular.element($document).on('keydown', escape);

        scope.isInList = function(fieldSetKey) {
          return Visrec.selectedCluster &&
            fieldSetKey === Visrec.selectedCluster.key;
        };

        scope.select = function(subcluster) {
          scope.selectedSubcluster = subcluster;
          Logger.logInteraction(Logger.actions.CLUSTER_SELECT, subcluster);
        };

        scope.close = function() {
          Logger.logInteraction(Logger.actions.DRILL_DOWN_CLOSE, Visrec.selectedCluster.key);
          scope.Visrec.selectedCluster = null;

        };

        scope.$watch('Visrec.selectedCluster', function(selectedCluster) {
          scope.selectedSubcluster = selectedCluster ? selectedCluster[0] : null;
        });
      }
    };
  });
