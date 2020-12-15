# Widget Integration

## IFRAME Integration

This variant uses embedded `<div>` with `<iframe>`. The integration example is in [this repository](https://github.com/e-sdf/B2NOTE-Integration-Example) with a commented HTML page and CSS file.

As this integration is the easiest at the side of an integrating service, it is currently the preferred one, although integrating the JavaScript app is also possible (contact us if interested).

### Target types

The following target types are distinguised based on the provided parameters. See [https://www.w3.org/TR/annotation-model/](Web Annotation Data Model) for details; `pidName_tofeed` and `subjectName_tofeed` are extensions allowing to provide human-friendly names to URLs. 

| Target Type                   | `pid_tofeed` | `pidName_tofeed` | `subject_tofeed` | `subjectName_tofeed` | `xPath_tofeed` | `textContent_tofeed` | `startOffset_tofeed` | `endOffset_tofeed` | `svgSelector_tofeed` | `tableSelector_tofeed` | `pdfSelector_tofeed` |
| ----------------------------- | :----------: | :--------------: | :--------------: | :------------------: | :------------: | :------------------: | :------------------: | :----------------: | :------------------: | :--------------------: | :------------------: |
| Page                          |      x       |   optional       |                  |                      |                |                      |                      |                    |                      |                        |                      |
| Any link on page              |      x       |   optional       |        x         |      optional        |                |                      |                      |                    |                      |                        |                      |
| Text selection on page        |      x       |   optional       |                  |                      |       x        |          x           |         x            |         x          |                      |                        |                      |
| Image region                  |      x       |   optional       |                  |                      |                |                      |                      |                    |          x           |                        |                      |
| Image region on page          |      x       |   optional       |        x         |      optional        |                |                      |                      |                    |          x           |                        |                      |
| Table file                    |      x       |   optional       |                  |                      |                |                      |                      |                    |                      |           x            |                      |
| Table on page                 |      x       |   optional       |        x         |      optional        |                |                      |                      |                    |                      |           x            |                      |
| PDF file                      |      x       |   optional       |                  |                      |                |                      |                      |                    |                      |                        |           x          |
| PDF file on page              |      x       |   optional       |        x         |      optional        |                |                      |                      |                    |                      |                        |           x          |

- `pid_to_feed`
  - URL of the annotated resource (`subject_to_feed` not present)
  - URL of the page hosting the annotated resource (`subject_to_feed` present) 

- `pidName_tofeed` ... optional name that will be displayed to user instead of `pid_tofeed`
- `subject_tofeed` ... URL of the annotated resource on the page (link)
- `subjectName_tofeed` ... optional name that will be displayed to user instead of `subject_tofeed`
- `xPath_tofeed` ... XPath of the text element on page
- `textContent_tofeed` ... selected text
- `startOffset_tofeed` ... index of the first character of text selection (contents of `xPath_tofeed`)
- `endOffset_tofeed` ... index of the last character of text selection (contents of `xPath_tofeed`)
- `svgSelector_tofeed` ... string containing SVG
- `tableSelector_tofeed` ... table selector specifying either entire sheet or its range conforming to the following TypesScript definition:

```typescript
interface RowAddress {
  row: number;
}

export interface ColumnAddress {
  row: number;
}

interface CellAddress extends ColumnAddress, RowAddress {}

type TableRange = {
  start: RowAddress;
  end: RowAddress;
} | {
  start: ColumnAddress;
  end: ColumnAddress;
} | {
  start: CellAddress;
  end: CellAddress;
}

interface TableSelector {
  sheet: string;
  range?: TableRange;
}
```

- `pdfSelector_tofeed` ... PDF document selector specifying a page number and optionally a selection on it conforming to the following TypesScript definition:

```typescript
interface PdfSelector {
  pageNumber: number;
  selection?: SvgSelector;
}
```

### Notifications

The hosting page is notified of the following events using the JavaScript [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) functionality:

#### Widget loaded

Once the widget is loaded, it emits the `"B2NOTE loaded"` message.

#### Annotation events

Operations on annotations are reported in the format:

```json
{
  action: "create"|"edit"|"delete",
  annotationType: "semantic"|"keyword"|"comment",
  annotationIRI: string
}
```
The details and definitions can be checked in [notify.ts](https://github.com/e-sdf/b2note-client-lib/blob/master/src/client/components/notify.ts).

