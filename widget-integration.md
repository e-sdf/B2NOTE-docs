# Widget Integration

## IFRAME Integration

This variant uses embedded `<div>` with `<iframe>`. The integration example is in [this repository](https://github.com/e-sdf/B2NOTE-Integration-Example) with a commented HTML page and CSS file.

As this integration is the easiest at the side of an integrating service, it is currently the preferred one, although integrating the JavaScript app is also possible (contact us if interested).

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

