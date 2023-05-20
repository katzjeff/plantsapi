# Plant/Flowers API

A simple API with endpoints that provide you access to a database of plants and flowers that can be used for setting up and creating a bee garden

## Endpoints
GET: Search All Plants
```bash
/plants
```
GET: Search for specific plant with ID
```bash
/plants/id
```

GET: Query using color parameter
```bash
/plants?color=Purple
```

GET: Query using season parameter
```bash
/plants?season=summer
```

GET: Query using water needs
```bash
/plants?water=Moderate
```

GET: Plants Height
```bash
/plants?height=12-24
```