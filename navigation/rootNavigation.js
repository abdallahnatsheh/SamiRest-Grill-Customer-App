import * as React from "react";
//global navigator to be able to use navigation from any component
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
export function replace(name, params) {
  navigationRef.current?.replace(name, params);
}
