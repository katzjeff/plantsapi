# GARDEN API

The GARDEN API is a powerful and comprehensive plant and flower data API designed to assist in the creation of bee gardens, home gardens, and farms. It offers a vast collection of information about various plant species, their characteristics, cultivation requirements, and their significance for pollinators like bees.

The API enables users to search for plants based on specific criteria, such as flower color, height, water and sunlight requirements, and preferred soil type. It also provides insights into plants that are particularly attractive to bees, making it an invaluable resource for creating bee-friendly environments.

Developers and gardening enthusiasts can integrate our API into their applications, websites, or software solutions to enhance their offerings. By leveraging our plant and flower data, they can provide personalized recommendations, design garden layouts, optimize pollinator habitats, and make informed decisions about plant selection and cultivation.

The GARDEN API aims to empower users with reliable and up-to-date information, fostering sustainable gardening practices and contributing to the preservation of bee populations and ecosystem health. Whether it's designing a vibrant home garden, establishing a bee-friendly farm, or planning landscaping projects, our API is a valuable tool for anyone passionate about plants, flowers, and supporting pollinators.

## API Overview

Our API provides several endpoints to meet your needs when working with plant and flower data:

1. Search All Plants/Flowers: Retrieve a comprehensive list of plants and flowers available in the database. Explore their botanical names, common names, descriptions, growth habits, flowering seasons, and growing requirements.

2. Search Plants/Flowers by ID: Retrieve detailed information about a specific plant or flower using its unique identifier. Access attributes such as botanical name, common name, description, growth habit, flowering season, and growing requirements.

3. Create New Plant/Flower: Add a new plant or flower to the database by providing its attributes. A unique identifier is generated, and the entry is stored for future reference.

4. Search Plants/Flowers by Attributes: Search for plants or flowers based on various attributes like flower color, growth habit, or soil type. Receive a list of matching results to meet your specific criteria.

These endpoints empower you to explore, contribute, and retrieve plant and flower data, supporting your bee garden, home garden, or farming projects effectively.

## Endpoints

### Endpoint Description: Search All Plants/Flowers

````plain text
Endpoint URL: /plants
````

#### Description

The "Search All Plants/Flowers" endpoint allows users to retrieve a comprehensive list of plants and flowers available in the database. This endpoint serves as a starting point for exploring the vast collection of plant species, their attributes, and related information.
Request:
Method: GET
Parameters: None

### Response:
The API responds with a list of plants and flowers in a standardized format, providing essential details for each entry.
Each plant/flower object may include information such as:
- Botanical name: The scientific name of the plant or flower.
- Common name: The popular or colloquial name by which the plant is known.
- Description: A brief description or overview of the plant's characteristics and features.
- Growth habit: The natural form or shape of the plant, such as shrub, tree, or herbaceous.
- Flowering season: The specific time or season during which the plant typically produces flowers.
- Growing requirements: Essential information about the plant's preferred conditions for successful cultivation, including sunlight, water, soil type, and temperature range.

### Usage

- Users can utilize the "Search All Plants/Flowers" endpoint to obtain a comprehensive inventory of available plants and flowers.
- The retrieved data can be utilized for various purposes, such as:

    1. Creating plant catalogs or directories.
    2. Generating plant recommendations based on specific criteria.
    3. Designing garden layouts or landscaping projects.
    4. Conducting research or educational activities related to botany or horticulture.

Note:
Pagination or filtering options can be implemented to manage large result sets and refine search results based on specific criteria, if desired.
Additional endpoints may provide more advanced search functionalities based on specific attributes or criteria, allowing users to narrow down their search to meet their specific needs.

Example Request:

````Plain Text
GET /plants
````

Example Response:

```` json
{
  "plants": [
     {
            "id": 1,
            "botanicalName": "Lavandula angustifolia",
            "name": "Lavender",
            "description": "Aromatic perennial shrub with narrow, gray-green leaves and spikes of purple flowers.",
            "growthHabits": "Perennial",
            "floweringSeason": "Summer",
            "growingRequirements": {
                "sunlightRequirements": "Full sun",
                "waterRequirements": "Moderate",
                "soliType": "Well-drained",
                "tempRange": "50-90°F"
            },
            "nativeRegion": "Mediterranean",
            "companionPlants": [
                "Rosemary",
                "Sage",
                "Chives"
            ],
            "flowerColor": "Purple",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lavender_in_full_bloom.JPG/1200px-Lavender_in_full_bloom.JPG",
            "plantHeight": "2-3 feet"
        },
        {
            "id": 2,
            "botanicalName": "Rosa rugosa",
            "name": "Rose",
            "description": "Shrub with prickly stems and fragrant flowers.",
            "growthHabits": "Perennial",
            "floweringSeason": "Spring, Summer",
            "growingRequirements": {
                "sunlightRequirements": "Full sun",
                "waterRequirements": "Moderate",
                "soliType": "Well-drained",
                "tempRange": "35-95°F"
            },
            "nativeRegion": "Northeast Asia",
            "companionPlants": [
                "Lavender",
                "Sage",
                "Chives"
            ],
            "flowerColor": "Red, pink, yellow, white",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Rosa_rugosa_flower.jpg/1200px-Rosa_rugosa_flower.jpg",
            "plantHeight": "3-6 feet"
        },
    ...
  ]
}

````

Please note that the provided example response showcases a simplified structure, and the actual response may include additional fields and more extensive information for each plant/flower entry.

GET: Search All Plants

```bash
/plants
```

GET: Search for specific plant with ID

```bash
/plants/:id
```

GET: Search for plants/flowers using other attributes

```bash
/plants/search
```

POST: Create a new plant/flower

```bash
/plants

```
