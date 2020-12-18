# Widget Integration through IFRAME

The widget is embedded in a `<div>` within `<iframe>`. The integration example is in [this repository](https://github.com/e-sdf/B2NOTE-Integration-Example) with a commented HTML page and CSS file.

## Target parameters

The target types are distinguised based on the provided parameters. For details about the targets in B2NOTE see [https://www.w3.org/TR/annotation-model/](Web Annotation Data Model). B2NOTE implements several extensions over this basic format.

The annotated target is encoded in the POST parameters as shown in [the example](https://github.com/e-sdf/B2NOTE-Integration-Example/blob/master/Sample%20Page/index.html). There are currently two formats:

### Pid & Source format (DEPRECATED)

This is the old format that supports only limited annotation targets.

| Target Type                   | `pid_tofeed` | `pidName_tofeed` | `subject_tofeed` | `subjectName_tofeed` |
| ----------------------------- | :----------: | :--------------: | :--------------: | :------------------: |
| Page                          |      x       |   optional       |                  |                      |
| A resource link on the page   |      x       |   optional       |        x         |      optional        |

- `pid_to_feed`
  - URL of the annotated resource (`subject_to_feed` not present)
  - URL of the page hosting the annotated resource (`subject_to_feed` present) 
- `pidName_tofeed` ... optional name that will be displayed to user instead of `pid_tofeed`
- `subject_tofeed` ... URL of the annotated resource on the page (link)
- `subjectName_tofeed` ... optional name that will be displayed to user instead of `subject_tofeed` (e.g. file name)


### Target encoding

This format contains a single parameter `target_toFeed` which is a string-encoded JSON object according to [this schema](./targetInput.schema.json). Here it is described how the various annotation targets are encoded.

#### Whole Page

```
{
  type: "PageTarget",
  pid: "URL of the page",
  pidName: "optional name that will be displayed to the user"
}
```

#### A Resource Link on a Page

```
{
  type: "LinkTarget",
  pid: "URL of the page",
  pidName: "optional name that will be displayed to the user",
  source: "URL of the annotated resource",
  sourceName: "optional name of the resource"
}
```

#### Text Selection on a Page

```
{
  type: "TextSelectionTarget",
  pid: "URL of the page",
  pidName: "optional name of the page",
  xPath: "XPath of the node holding the text",
  startOffset: "index of the first character of the selected text (number)",
  endOffset: "index of the last character of the selected text (number)",
  selectedText: "the selected text"
}
```

#### Image Region

```
{
  type: "ImageRegionTarget",
  pid: "URL of the image",
  pidName: "optional name of the image",
  svgSelector: "string with an SVG shape representing the selected region"
}
```

#### Image Region on a Page

```
{
  type: "ImageRegionOnPageTarget",
  pid: "URL of the page",
  pidName: "optional name of the image",
  source: "URL of the annotated resource",
  sourceName: "optional name of the resource"
  svgSelector: "string with an SVG shape representing the selected region"
}
```

#### Table

```
{
  type: "TableTarget",
  pid: "URL of the table file (csv, xls, xlsx)",
  pidName: "optional name of the table",
  range: "optional TableRange object"
}
```

The `TableRange` object can be one of the following:

```
{
  type: "RowRange",
  startRow: "number of the first row",
  endRow: "number of the last row"
}
```

```
{
  type: "ColumnRange",
  startColumn: "number of the first column",
  endColumn: "number of the last column"
}
```

```
{
  type: "CellRange",
  startColumn: "number of the first column",
  endColumn: "number of the last column"
  startRow: "number of the first row",
  endRow: "number of the last row"
}
```

#### PDF

```
{
  type: "PdfTarget",
  pageNumber: "number of the annotated page",
  svgSelector: "optional string with an SVG shape selecting a part of the page (as image)"
}
```

## Notifications

The hosting page is notified of the following events using the JavaScript [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) functionality:

### Widget loaded

Once the widget is loaded, it emits the `"B2NOTE loaded"` message.

### Annotation events

Operations on annotations are reported in the format:

```json
{
  action: "create"|"edit"|"delete",
  annotationType: "semantic"|"keyword"|"comment",
  annotationIRI: string
}
```
The details and definitions can be checked in [notify.ts](https://github.com/e-sdf/b2note-client-lib/blob/master/src/client/components/notify.ts).

