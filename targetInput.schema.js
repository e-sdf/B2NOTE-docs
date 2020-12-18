export const targetInputSchema = 
{
  "$id": "targetInput",
  "$ref": "#/definitions/TargetInput",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "CellAddress": {
      "additionalProperties": false,
      "properties": {
        "row": {
          "type": "number"
        }
      },
      "required": [
        "row"
      ],
      "type": "object"
    },
    "ColumnAddress": {
      "additionalProperties": false,
      "properties": {
        "row": {
          "type": "number"
        }
      },
      "required": [
        "row"
      ],
      "type": "object"
    },
    "ImageRegionOnPageTargetInput": {
      "additionalProperties": false,
      "properties": {
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "source": {
          "type": "string"
        },
        "sourceName": {
          "type": "string"
        },
        "svgSelector": {
          "type": "string"
        },
        "type": {
          "const": "ImageRegionOnPageTarget",
          "type": "string"
        }
      },
      "required": [
        "pid",
        "source",
        "svgSelector",
        "type"
      ],
      "type": "object"
    },
    "ImageRegionTargetInput": {
      "additionalProperties": false,
      "properties": {
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "svgSelector": {
          "type": "string"
        },
        "type": {
          "const": "ImageRegionTarget",
          "type": "string"
        }
      },
      "required": [
        "pid",
        "svgSelector",
        "type"
      ],
      "type": "object"
    },
    "LinkTargetInput": {
      "additionalProperties": false,
      "properties": {
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "source": {
          "type": "string"
        },
        "sourceName": {
          "type": "string"
        },
        "type": {
          "const": "LinkTarget",
          "type": "string"
        }
      },
      "required": [
        "pid",
        "source",
        "type"
      ],
      "type": "object"
    },
    "PageTargetInput": {
      "additionalProperties": false,
      "properties": {
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "type": {
          "const": "PageTarget",
          "type": "string"
        }
      },
      "required": [
        "pid",
        "type"
      ],
      "type": "object"
    },
    "PdfTargetInput": {
      "additionalProperties": false,
      "properties": {
        "pageNumber": {
          "type": "number"
        },
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "selector": {
          "type": "string"
        },
        "type": {
          "const": "PdfTarget",
          "type": "string"
        }
      },
      "required": [
        "pageNumber",
        "pid",
        "type"
      ],
      "type": "object"
    },
    "RowAddress": {
      "additionalProperties": false,
      "properties": {
        "row": {
          "type": "number"
        }
      },
      "required": [
        "row"
      ],
      "type": "object"
    },
    "TableRange": {
      "anyOf": [
        {
          "additionalProperties": false,
          "properties": {
            "end": {
              "$ref": "#/definitions/RowAddress"
            },
            "start": {
              "$ref": "#/definitions/RowAddress"
            },
            "type": {
              "const": "RowRange",
              "type": "string"
            }
          },
          "required": [
            "type",
            "start",
            "end"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "end": {
              "$ref": "#/definitions/ColumnAddress"
            },
            "start": {
              "$ref": "#/definitions/ColumnAddress"
            },
            "type": {
              "const": "ColumnRange",
              "type": "string"
            }
          },
          "required": [
            "type",
            "start",
            "end"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "end": {
              "$ref": "#/definitions/CellAddress"
            },
            "start": {
              "$ref": "#/definitions/CellAddress"
            },
            "type": {
              "const": "CellRange",
              "type": "string"
            }
          },
          "required": [
            "type",
            "start",
            "end"
          ],
          "type": "object"
        }
      ]
    },
    "TableTargetInput": {
      "additionalProperties": false,
      "properties": {
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "range": {
          "$ref": "#/definitions/TableRange"
        },
        "sheet": {
          "type": "string"
        },
        "type": {
          "const": "TableTarget",
          "type": "string"
        }
      },
      "required": [
        "pid",
        "sheet",
        "type"
      ],
      "type": "object"
    },
    "TargetInput": {
      "anyOf": [
        {
          "$ref": "#/definitions/PageTargetInput"
        },
        {
          "$ref": "#/definitions/LinkTargetInput"
        },
        {
          "$ref": "#/definitions/TextSelectionTargetInput"
        },
        {
          "$ref": "#/definitions/ImageRegionTargetInput"
        },
        {
          "$ref": "#/definitions/ImageRegionOnPageTargetInput"
        },
        {
          "$ref": "#/definitions/TableTargetInput"
        },
        {
          "$ref": "#/definitions/PdfTargetInput"
        }
      ]
    },
    "TextSelectionTargetInput": {
      "additionalProperties": false,
      "properties": {
        "endOffset": {
          "type": "number"
        },
        "pid": {
          "type": "string"
        },
        "pidName": {
          "type": "string"
        },
        "selectedText": {
          "type": "string"
        },
        "startOffset": {
          "type": "number"
        },
        "type": {
          "const": "TextSelectionTarget",
          "type": "string"
        },
        "xPath": {
          "type": "string"
        }
      },
      "required": [
        "endOffset",
        "pid",
        "selectedText",
        "startOffset",
        "type",
        "xPath"
      ],
      "type": "object"
    }
  }
}