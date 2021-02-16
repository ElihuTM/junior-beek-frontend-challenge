#!/bin/bash

for (( c=1; c<=10; c++ ))
do
	curl --location --request POST 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries' \
	--header 'Authorization : Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc' \
	--header 'X-Contentful-Content-Type: audiocontent-v19' \
	--data-raw '{
		"fields": {
		"title": {
			"es-MX": "This is a test"
		},
		"is_original": {
			"es-MX": false
		},
		"street_date": {
			"es-MX": "2020-12-25T00:00-06:00"
		},
		"cost_per_play": {
			"es-MX": 90
		},
		"authors": {
			"es-MX": [
			"Ashlee Vance"
			]
		},
		"narrators": {
			"es-MX": [
			"Fred Sanders"
			]
		},
		"duration": {
			"es-MX": 589632
		},
		"cover": {
			"es-MX": "https://images.findawayworld.com/v1/image/cover/CD059097"
		}
		}
	}'
done