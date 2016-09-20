# Tags Plugin
Documentation of "contract" between plugin and the backend used.

## Backend endpoints 
### Search
Search for tags.
##### Request
`POST /commands`

Request body:
```json
{"action":"search", "data": {"entity": "tags", "query":"a**"}}
```
##### Response
Response, if found (`200 OK`) should be;
```json
[
  {
    "uuid": "2b206611-3d79-4e7c-aa19-3153a8057767",
    "name": [
      "Alpint"
    ],
    "description": [
      "Alpint"
    ],
    "shortDescription": [
      "Alpin skidsport är en sammanfattande beteckning för slalom, storslalom, parallellslalom, super-G, störtlopp och alpin kombination."
    ],
    "type": [
      "abstract"
    ],
    "typeCatalog": [
      "cpnat"
    ],
    "imType": [
      "x-im/category"
    ]
  },
  {
    "uuid": "778ecc9c-fad3-4e17-b688-ddfe93cbd06c",
    "name": [
      "Amfotboll"
    ],
    "description": [
      "Amfotboll"
    ],
    "shortDescription": [
      "Amfotboll"
    ],
    "type": [
      "abstract"
    ],
    "typeCatalog": [
      "cpnat"
    ],
    "imType": [
      "x-im/category"
    ]
  },
  {
    "uuid": "26abfeb8-b83a-4f80-9642-5769ad239509",
    "name": [
      "John Doe"
    ],
    "description": [
      "Nice guy"
    ],
    "shortDescription": [
      "Web developer"
    ],
    "type": [
      "person"
    ],
    "typeCatalog": [
      "cpnat"
    ],
    "imType": [
      "x-im/person"
    ]
  },
  {
    "uuid": "f8a96ebd-7132-42fe-a4c0-7b08e6d9612c",
    "name": [
      "Arbete"
    ],
    "type": [
      "abstract"
    ],
    "typeCatalog": [
      "cpnat"
    ],
    "imType": [
      "x-im/category"
    ]
  }
]
```
Note that response for "tags" can contain different types of concepts. 

If no match then response (`200 OK`) should simply be;
```json
[]
```



