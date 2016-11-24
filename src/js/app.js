//Create Module. Define dependancies
var leungPortfolio = angular.module('leungPortfolio', ['ngRoute', 'ngAnimate']);

//For menu
leungPortfolio.run(function($rootScope) {
    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });
});

leungPortfolio.controller("modalDemo", function($scope, $rootScope) {
    $scope.leftVisible = false;
    $scope.rightVisible = false;

    $scope.close = function() {
        $scope.leftVisible = false;
        $scope.rightVisible = false;
    };

    $scope.showLeft = function(e) {
        $scope.leftVisible = true;
        e.stopPropagation();
    };

    $scope.showRight = function(e) {
        $scope.rightVisible = true;
        e.stopPropagation();
    }

    $rootScope.$on("documentClicked", _close);
    $rootScope.$on("escapePressed", _close);

    function _close() {
        $scope.$apply(function() {
            $scope.close();
        });
    }
});

leungPortfolio.directive("menu", function() {
    return {
        restrict: "E",
        template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
        transclude: true,
        scope: {
            visible: "=",
            alignment: "@"
        }
    };
});

leungPortfolio.directive("menuItem", function() {
     return {
         restrict: "E",
         template: "<div ng-click='navigate()' ng-transclude></div>",
         transclude: true,
         scope: {
             hash: "@"
         },
         link: function($scope) {
             $scope.navigate = function() {
                 window.location.hash = $scope.hash;
             }
         }
     }
});

//Configure routes
leungPortfolio.config(function($routeProvider) {
  $routeProvider

    //route for the work page
    .when('/', {
      templateUrl : 'views/home.html',
      controller : 'mainController'
    })

    //route for work page
    .when('/work', {
      templateUrl : 'views/work.html',
      controller : 'workController'
    })

    //Route
    .when('/grcd_identity', {
      templateUrl : 'views/grcd_identity.html',
      controller : 'grcdController'
    });
});

// create the controller and inject Angular's $scope
leungPortfolio.controller('mainController', function($scope, preloader) {

    // Define view class
    $scope.pageClass = 'view-home';

    //Keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;
    $scope.imageLocations = [
      "assets/foggy_bg.jpg",
      "assets/solar_hero.jpg"
    ];

    // Preload the images; then, update display when returned.
    preloader.preloadImages( $scope.imageLocations ).then(
      function handleResolve( imageLocations ) {
        // Loading was successful.
        $scope.isLoading = false;
        $scope.isSuccessful = true;
        console.info( "Preload Successful" );
      },

      function handleReject( imageLocation ) {
        // Loading failed on at least one image.
        $scope.isLoading = false;
        $scope.isSuccessful = false;
        console.error( "Image Failed", imageLocation );
        console.info( "Preload Failure" );
      },

      function handleNotify( event ) {
        $scope.percentLoaded = event.percent;
        console.info( "Percent loaded:", event.percent );
      }
    );
});

leungPortfolio.controller('workController', function($scope) {

    // Define view class
    $scope.pageClass = 'view-work';
});

leungPortfolio.controller('grcdController', function($scope) {

    // Define view class
    $scope.pageClass = 'view-work-grcd';

    $scope.$on('$destroy',function(){
            console.log('killed?');
            //cancelAnimationFrame( animationRequest );
        });
});

//Preload html only. No images
leungPortfolio.run(function ($templateCache, $http) {
  $http.get('views/work.html', { cache: $templateCache });
});

//Data for project index page
leungPortfolio.controller("projectIndex", function($scope) {
    $scope.projects = [
       {
            "title" : "PG&E Solar Dashboard",
            "description" : "An online experience to help PG&E solar customers understand and visualize their electricity bill",
            "imgSrc" : "assets/solar_hero.jpg",
            "link": "#"
        },{
            "title" : "GRCD Identity: Experiments with webgl",
            "description" : "Brading the graphic commuincation design program at the University of Cincinati ",
            "imgSrc" : "assets/grc3d_hero.jpg",
            "link" : "#grcd_identity"
        },{
            "title" : "Berglunds snabbköp",
            "description" : "Sweden",
            "link" : ""
        },{
            "title" : "Berglunds snabbköp",
            "description" : "Sweden",
            "link" : ""
        }
    ]
});
