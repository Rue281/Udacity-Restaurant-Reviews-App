var version = 'v2';
//files
cacheNames = [
'/',
'/index.html',
'/restaurant.html',
'/css/responsive.css',
'/css/responsiveRestaurant.css',
'/css/styles.css',
'/data/restaurants.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg',
'/img/favicon.jpg',
'/js/dphelper.js',
'/js/main.js',
'/js/restaurant_info.js',
/*'https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600',
  'https://fonts.googleapis.com/css?family=Montserrat:600'*/
];

self.addEventListener('install',function(event){
	console.log("installing event");
	event.waitUntil(
		caches.open(version)
		.then(function(cache){
			/*let cached = cache.addAll(cacheNames);
			console.log(cached);*/
			return cache.addAll(cacheNames);
		}).catch(error => {console.log("error in installing: "+error);
		})
	);
});

//.then( (cache) => {return cache.addAll(cacheNames);});
self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			if (response) {
				console.log("found "+ event.request + " in cache!!");
				return response;
			}
			else{
				console.log("couldn't find the request in cache");
				return fetch(event.request)
				//cache the file if it is not being cached
				.then(function(response){
					const clonedResponses = response.clone();
					caches.open(version).then(function(cache){
						cache.put(event.request,clonedResponses);
					})
					return response;
				})
				.catch(error => {console.log("an error occured " + error);
			});
			}
		})
	);
});