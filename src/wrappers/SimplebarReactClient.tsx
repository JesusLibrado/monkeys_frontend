"use client";
import type SimpleBarCore from "simplebar-core";
// https://stackoverflow.com/questions/76211877/the-xxxx-library-may-need-to-update-its-package-json-or-typings-ts
import SimpleBar, { type Props } from "simplebar-react";
import { ChildrenType } from "../types/component-props";

type SimplebarReactClientProps = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<SimpleBarCore | null>
>["arguments"] &
  ChildrenType;

const SimplebarReactClient = ({
  children,
  ...options
}: SimplebarReactClientProps) => {
  return <SimpleBar {...options}>{children}</SimpleBar>;
};

export default SimplebarReactClient;
