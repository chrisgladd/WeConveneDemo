'use strict';

/* Directives */
angular.module('SeedDraw.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('drawing', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
          //drawing:"="
      },
      controller: function($scope, $element, DrawingService) {
        //console.log(DrawingService);
        //$scope.drawing.layerIdx = 0;

        //this.addLayer = function(layer) {
            //$scope.drawing.layers[$scope.drawing.layerIdx].push(layer);
        //}
      },
      template:
        '<div class="DrawingDirectiveTop">' +
          '<layer resize width="{{width}}" height="{{height}}" ng-repeat="layer in DrawingService.GetLayers()" layerID="layer.id" ng-id="Layer{{layer.index}}" class="DrawCanvas"></layer>' +
		  //'<div class="DrawingContent" ng-transclude></div>'+
		  '<buffer resize width="{{width}}" height="{{height}}" ng-model="BufferCanvas" ng-id="BufferCanvas{{drawing.id}}" class="DrawCanvas"></buffer>'+
          '<mouse resize width="{{width}}" height="{{height}}" id="DrawMouseDiv" class="DrawCanvas"></mouse>'+
          '<brush resize width="{{width}}" height="{{height}}" ng-id="Brush{{drawing.id}}" class="DrawBrush"></brush>'+
        '</div>',
      replace: true
    };
  }).
  directive('layer', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {
          //layer:"="
      },
      controller: function($scope, $element, $attrs, DrawingService) {
        //$scope.layer.context = $element[0].getContext('2d');
        var id = $attrs['layerID'];
        var context = $element[0].getContext('2d');
        DrawingService.SetLayerContext(id, context);
      },
      link:function (scope, element, attrs) {
      },
      template: '<canvas></canvas>',
      replace: true
    };
  }).
  directive('buffer', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element, DrawingService) {
        //$scope.buffer.context = $element[0].getContext('2d');
        var context = $element[0].getContext('2d');
        DrawingService.SetBufferContext(context);
      },
      link:function (scope, element, attrs) {
      },
      template: '<canvas></canvas>',
      replace: true
    };
  }).
  directive('brush', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {
      },
      controller: function($scope, $element, DrawingService) {
        $scope.brush = DrawingService.GetBrush();
        
        $scope.RedrawBrush = function() {
            //$scope.brush.element = $element[0];
            DrawingService.SetBrushElement($element[0]);

            var brush = DrawingService.GetBrush();
            var size = brush.size;
            var center = brush.size / 2;
            var color = brush.color;
            var cint = parseInt(color, 16);
            var rgb = "rgba("+((cint >> 16) & 255)+","+((cint >> 8) & 255)+","+(cint & 255);

            var ctx = brush.element.getContext('2d');
            ctx.clearRect(0,0,size,size);
            //Redraw the brush
            console.log("Redrawing Brush");
            if(brush.type == Brush.Marker){
                ctx.beginPath();
                ctx.arc(center, center, center, 0, 2 * Math.PI, false);
                ctx.fillStyle = "#"+brush.color;
                ctx.fill();
                ctx.closePath();
            }
            else if(brush.type == Brush.Radial){
                var width = size;//*.95;
                
                var gradient = ctx.createRadialGradient(center,center,0,center,center,center);  
                gradient.addColorStop(0, rgb+",1)");
                gradient.addColorStop(.5, rgb+",.3)");
                gradient.addColorStop(1, rgb+",0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0,0,size,size);
            }
        };

        $scope.$on('RedrawBrush', function(){
            console.log("Redraw Brush Received");
            $scope.brush = DrawingService.GetBrush();
        });

        DrawingService.SetBrushSize(10);
      },
      link:function (scope, element, attrs) {
        scope.$watch(scope.brush, function (type) {
            console.log("Brush Changed");
            scope.RedrawBrush();
        });
      },
      template: '<canvas></canvas>',
      replace: true
    };
  }).
  directive('mouse', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element, DrawingService) {
        $scope.BindMovements = function() {
            $element.bind("mousedown", function(e) {
                console.log("Mouse down hit");
                $scope.isMouseDown = true;
                console.log(DrawingService);
                DrawingService.SetPrevious(e.x, e.y);
                //$scope.buffer.prev.x = e.x;
                //$scope.buffer.prev.y = e.y;
            });

            $element.bind("mousemove", function(e) {
                //console.log("Mouse move hit");
                if($scope.isMouseDown){
                    DrawingService.PushToBuffer(e.x, e.y);
                    //$scope.buffer.x.push(e.x);
                    //$scope.buffer.y.push(e.y);
                }
            });

            $element.bind("mouseup", function() {
                console.log("Mouse up hit");
                $scope.isMouseDown = false;
            });

            $element.bind("mouseleave", function(e) {
                console.log("Mouse leave hit");
                $scope.isMouseDown = false;
            });

            $element.bind("touchstart", function(e) {
                e.preventDefault();
                
                $scope.isMouseDown = true;
                var x = e.targetTouches[0].clientX;
                var y = e.targetTouches[0].clientY;
                DrawingService.SetPrevious(x, y);
                //$scope.buffer.prev.x = x;
                //$scope.buffer.prev.y = y;
            });

            $element.bind("touchmove", function(e) {
                e.preventDefault();
                if($scope.isMouseDown){
                    var x = e.targetTouches[0].clientX;
                    var y = e.targetTouches[0].clientY;
                    DrawingService.PushToBuffer(x, y);
                    //$scope.buffer.x.push(x);
                    //$scope.buffer.y.push(y);
                }
            });

            $element.bind("touchend", function(e) {
                e.preventDefault();
                console.log("touch end hit");
                $scope.isMouseDown = false;
            });
        }
      },
      link: function(scope, element, attrs) {
          scope.BindMovements();
      },
      template: '<canvas id="DrawingBrush"></canvas>',
      replace: true
    };
  })
.directive('resize', function ($window) {
    return function (scope) {
        scope.width = $window.innerWidth;
        scope.height = $window.innerHeight;
        angular.element($window).bind('resize', function () {
            scope.$apply(function () {
                scope.width = $window.innerWidth;
                scope.height = $window.innerHeight;
            });
        });
    };
})
.directive('sTap', function() {
    //Thanks to GoodFilms for the inpiration
    //http://goodfil.ms/blog/posts/2012/08/13/angularjs-and-the-goodfilms-mobile-site-part-1/
    return function(scope, element, attrs) {
        tapping = false;
        element.bind('touchstart', function() {
            tapping = true;
        });
        element.bind('touchmove', function() {
            tapping = false;
        });
        element.bind('touchstart', function() {
            if(tapping){
                scope.$apply(attrs['gfTap']);
            }
        });
    };
});
